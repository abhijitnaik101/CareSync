import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import SearchBox from "../../components/Patient/Searchbox";
import SearchBar from "../../components/Patient/SearchBar";

// Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJoaWppdG5haWsiLCJhIjoiY2ptOXpvbzJpMDNxYTN2bXZwZm9ibWc4MCJ9.hl8pE-4Uf56VpiBBKIcjeQ";

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const start: number[] = [85.776628, 20.275725];
  const [endCoords, setEndCoords] = useState<number[] | null>(null); // Initially null

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: start as [number, number],
      zoom: 12,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      })
    );

    map.current.addControl(
      new mapboxgl.ScaleControl({
        unit: "metric",
      })
    );

    map.current.on("load", () => {
      addStartPoint();

      // Add click event listener to the map
      // map.current!.on('click', (e) => {
      //   const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      //   setEndCoords(coords); // Update endCoords with clicked point coordinates
      // });
    });
  }, []);

  useEffect(() => {
    if (endCoords) {
      updateEndPoint(endCoords);
      getRoute(endCoords);
      console.log("End coords: ", endCoords);
    }
  }, [endCoords]);

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
        "circle-radius": 10,
        "circle-color": "#3887be",
      },
    });

    // // Create an element to display custom marker
    // const customMarkerElement = document.createElement('div');
    // customMarkerElement.className = 'custom-marker'; // You can customize the CSS class
    // //customMarkerElement.style.backgroundImage = 'url(D:\WebCode\caresync\client\public\vite.svg)'; // Replace with your marker image path
    // customMarkerElement.style.width = '30px'; // Adjust the size as needed
    // customMarkerElement.style.height = '30px';
    // customMarkerElement.style.backgroundColor = '#F44336';
    // //create an marker
    // if (map.current) {
    //   new mapboxgl.Marker(customMarkerElement)
    //     .setLngLat(start)
    //     .addTo(map.current);
    // }
  };

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
          "circle-radius": 10,
          "circle-color": "#f30",
        },
      });
    }
  };

  const updateEndPoint = (coords: number[]) => {
    addEndPoint(coords);
  };

  const getRoute = async (end: number[]) => {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );

    const json = await query.json();
    const data = json.routes[0];
    console.log(json);

    const distance = data.distance;
    console.log(`Distance between start and end point: ${distance} meters`);

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

  return (
    <div className="relative p-5 h-screen w-full bg-gray-900">
      <SearchBox coordsCallback={(coords) => setEndCoords(coords)} />
      {/* <SearchBar coordsCallback={(coords) => setEndCoords(coords)} /> */}
      <div
        ref={mapContainer}
        className="relative h-full w-full z-0 shadow-lg rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default MapComponent;
