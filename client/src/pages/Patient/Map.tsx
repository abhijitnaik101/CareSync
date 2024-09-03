import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Geocoder } from "@mapbox/search-js-react";
import SearchBox from './SearchBox';
import Map from 'react-map-gl/dist/esm/components/map';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWJoaWppdG5haWsiLCJhIjoiY2ptOXpvbzJpMDNxYTN2bXZwZm9ibWc4MCJ9.hl8pE-4Uf56VpiBBKIcjeQ';

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const start: [number, number] = [85.776628, 20.275725];
  const [endCoords, setEndCoords] = useState<[number, number] | null>(null); // Initially null

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: start,
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on('load', () => {
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
    }
  }, [endCoords]);

  const addStartPoint = () => {
    map.current!.addLayer({
      id: 'start-point',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: start
            }
          }]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#3887be'
      }
    });
  };

  const addEndPoint = (coords: [number, number]) => {
    const end = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coords
        }
      }]
    };

    if (map.current!.getLayer('end-point')) {
      (map.current!.getSource('end-point') as mapboxgl.GeoJSONSource).setData(end);
    } else {
      map.current!.addLayer({
        id: 'end-point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: end
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#f30'
        }
      });
    }
  };

  const updateEndPoint = (coords: [number, number]) => {
    addEndPoint(coords);
  };

  const getRoute = async (end: [number, number]) => {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json();
    const data = json.routes[0];

    const distance = data.distance;
    console.log(`Distance between start and end point: ${distance} meters`);

    const route = data.geometry.coordinates;
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };

    if (map.current!.getSource('route')) {
      (map.current!.getSource('route') as mapboxgl.GeoJSONSource).setData(geojson);
    } else {
      map.current!.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#1E201E',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
  };

  return (
    <div>
      <Geocoder
        accessToken={mapboxgl.accessToken}
        map={map.current!}
        mapboxgl={mapboxgl}
      />
      <SearchBox coordsCallback={(coords) => setEndCoords(coords)} />
      <div ref={mapContainer} className='w-full h-screen' />
      <div className='h-24 w-full bg-red-400'>End-coord: {endCoords?.join(', ')}</div>
    </div>
  );
};

export default MapComponent;
