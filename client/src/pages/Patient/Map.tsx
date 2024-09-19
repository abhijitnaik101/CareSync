import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import SearchBox from "../../components/Patient/Searchbox";

// Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJoaWppdG5haWsiLCJhIjoiY2ptOXpvbzJpMDNxYTN2bXZwZm9ibWc4MCJ9.hl8pE-4Uf56VpiBBKIcjeQ";

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const start: number[] = [85.776628, 20.275725]; // Starting point in Bhubaneswar
  const [endCoords, setEndCoords] = useState<number[] | null>(null);
  const [hospitalMarkers, setHospitalMarkers] = useState<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (map.current) return; // Initialize map once

    // Initialize the map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: start as [number, number],
      zoom: 12,
    });

    // Add controls to the map
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.ScaleControl({ unit: "metric" }));

    // Add the starting point
    map.current.on("load", () => {
      addStartPoint();
    });

    if (map.current) {
      new mapboxgl.Marker({
        color: "#FF5733",
      })
        .setLngLat(start)
        .addTo(map.current);
    }
  }, []);

  // Update endpoint when endCoords changes
  useEffect(() => {
    if (endCoords) {
      updateEndPoint(endCoords);
      getRoute(endCoords);
    }
  }, [endCoords]);

  // Add starting point marker
  const addStartPoint = () => {
    map.current!.addLayer({
      id: "start-point",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: start,
              },
              properties: {
                description: "Start Point",
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 8,
        "circle-color": "#000",
      },
    });
  };

  // Add endpoint marker
  const addEndPoint = (coords: number[]) => {
    const end: GeoJSON.GeoJSON = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coords,
          },
          properties: {
            description: "End Point",
          },
        },
      ],
    };

    if (map.current!.getLayer("end-point")) {
      (map.current!.getSource("end-point") as mapboxgl.GeoJSONSource).setData(
        end
      );
    } else {
      map.current!.addLayer({
        id: "end-point",
        type: "circle",
        source: {
          type: "geojson",
          data: end,
        },
        paint: {
          "circle-radius": 8,
          "circle-color": "#000",
        },
      });
    }
  };

  // Update the end point marker
  const updateEndPoint = (coords: number[]) => {
    if (map.current!.getLayer("end-point")) {
      // Remove existing end point marker if present
      map.current!.removeLayer("end-point");
      map.current!.removeSource("end-point");
    }
    addEndPoint(coords);
  };

  // Fetch and display the route from start to end
  const getRoute = async (end: number[]) => {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );

    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;

    const geojson: GeoJSON.GeoJSON = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    if (map.current!.getSource("route")) {
      (map.current!.getSource("route") as mapboxgl.GeoJSONSource).setData(
        geojson
      );
    } else {
      map.current!.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#1E201E",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  };

  // Clear hospital markers
  const clearHospitalMarkers = () => {
    hospitalMarkers.forEach(marker => marker.remove());
    setHospitalMarkers([]);
  };

  // Display hospital markers
  const displayHospitalMarkers = (hospitals: { name: string; coords: [number, number] }[]) => {
    clearHospitalMarkers(); // Clear existing markers first

    const newMarkers = hospitals.map(hospital => {
      const marker = new mapboxgl.Marker()
        .setLngLat(hospital.coords as [number, number])
        .setPopup(new mapboxgl.Popup().setHTML(`<h4>${hospital.name}</h4>`)) // Add popup
        .addTo(map.current!);

      return marker;
    });

    setHospitalMarkers(newMarkers);
  };

  return (
    <div className="relative p-5 h-screen w-full bg-gray-900">
      <SearchBox 
        coordsCallback={(coords) => setEndCoords(coords)} 
        map={map.current} // Pass the map reference to SearchBox
      />
      <div
        ref={mapContainer}
        className="relative h-full w-full z-0 shadow-lg rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default MapComponent;
