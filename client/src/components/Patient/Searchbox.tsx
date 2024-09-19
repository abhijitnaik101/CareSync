import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { route } from '../../../backendroute';
import mapboxgl, { LngLat } from 'mapbox-gl';
import SideBarHospital from './SideBarHospital';
import { Hospital } from '../../Types';
import { bhubaneswarHospitals } from '../../DB/HospitalLocations';

interface SearchBoxProps {
  coordsCallback: (coords: number[] | null) => void;
  map: mapboxgl.Map | null; // Accept the map instance as a prop
  startingPosition: LngLat; // Starting position for routing
}

const SearchBox: React.FC<SearchBoxProps> = ({ coordsCallback, map, startingPosition }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Hospital[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<number[] | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [routeLayerId, setRouteLayerId] = useState<string | null>(null);

  // Fetch hospitals data from backend
  async function fetchHospitals() {
    try {
      const response = await axios.get(route + '/hospitals');
      setHospitals(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setHospitals(bhubaneswarHospitals);
  }, []);

  useEffect(() => {
    coordsCallback(selectedCoordinates);
  }, [selectedCoordinates]);

  useEffect(() => {
    if (map && selectedCoordinates) {
      clearMarkers();
      renderSingleMarker(selectedCoordinates);
      if (startingPosition) {
        renderRoute(startingPosition, selectedCoordinates);
      }
    }
  }, [map, selectedCoordinates]);

  const clearMarkers = () => {
    markers.forEach(marker => marker.remove());
    setMarkers([]);
    if (map && routeLayerId) {
      map.removeLayer(routeLayerId);
      map.removeSource(routeLayerId);
      setRouteLayerId(null);
    }
  };

  const renderMarkers = (searchTerm: string) => {
    clearMarkers();

    const filteredHospitals = hospitals
      .map(hospital => ({
        ...hospital,
        departments: hospital.departments.filter(department =>
          department.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter(hospital => hospital.departments.length > 0);

    const newMarkers = filteredHospitals.map(hospital => {
      const [lat, lng] = hospital.coordinates.map(Number);

      const marker = new mapboxgl.Marker({
        color: "#FF5733",
      })
        .setLngLat([lng, lat])
        .addTo(map!);

      return marker;
    });

    setMarkers(newMarkers);
  };

  const renderSingleMarker = (coords: number[]) => {
    if (map) {
      const [lat, lng] = coords;
      new mapboxgl.Marker({
        color: "#FF5733",
      })
        .setLngLat([lng, lat])
        .addTo(map!);
    }
  };

  const renderRoute = (start: LngLat, endCoords: number[]) => {
    if (map) {
      const [endLat, endLng] = endCoords;
      const routeLayerId = 'route-layer';

      if (map.getSource(routeLayerId)) {
        map.removeLayer(routeLayerId);
        map.removeSource(routeLayerId);
      }

      map.addSource(routeLayerId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [
                  [start.lng, start.lat],
                  [endLng, endLat],
                ],
              },
            },
          ],
        },
      });

      map.addLayer({
        id: routeLayerId,
        type: 'line',
        source: routeLayerId,
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#FF5733',
          'line-width': 5,
        },
      });

      setRouteLayerId(routeLayerId);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentSearch(event.target.value);
    setShowSuggestions(event.target.value.length > 0);
    if (event.target.value) {
      renderMarkers(event.target.value);
    } else {
      clearMarkers();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (hospital: Hospital) => {
    setSearchTerm(hospital.name);
    setDepartmentSearch('');
    
    // Set coordinates for the selected hospital
    const selectedCoords = hospital.coordinates.reverse().map(Number) as number[];
    setSelectedCoordinates(selectedCoords);
    
    // Trigger the route rendering via callback
    coordsCallback(selectedCoords);

    setSuggestions([]);
  };

  return (
    <div className="bg-gray-900 h-max">
      <div className="absolute top-0 left-1/3 mt-8 flex items-start justify-center z-10">
        {/* Department Search */}
        <div className="mr-2 w-96">
          <div className="flex items-center border border-gray-700 rounded-md shadow-lg bg-gray-800 text-white">
            <FaSearch className="mx-3 text-teal-400" />
            <input
              type="text"
              value={departmentSearch}
              onChange={handleSearch}
              placeholder="Search by department (e.g., Surgery, Emergency)"
              className="w-full p-2 pl-10 border-none rounded-l-none rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
            />
          </div>
          {/* Dropdown suggestions */}
          {showSuggestions && (
            <div className="relative w-full bg-gray-800 shadow-lg rounded-md max-h-60 overflow-y-auto mt-2">
              {hospitals
                .map(hospital => ({
                  ...hospital,
                  departments: hospital.departments.filter(department =>
                    department.name.toLowerCase().includes(departmentSearch.toLowerCase())
                  ),
                }))
                .filter(hospital => hospital.departments.length > 0)
                .map(hospital => (
                  <div
                    key={hospital.id}
                    className="p-2 hover:bg-gray-700 cursor-pointer text-white"
                    onClick={() => handleSelectSuggestion(hospital)} // Render route on selection
                  >
                    <h2 className="text-lg font-semibold text-teal-400">{hospital.name}</h2>
                    <ul className="pl-4 mt-1">
                      {hospital.departments.map(department => (
                        <li key={department.id} className="text-gray-300">
                          <div className="font-medium">
                            Department: {department.name}
                          </div>
                          <div className="text-sm">
                            Doctors: {department.doctors.map(doc => doc.name).join(', ')}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Hospital Search */}
        <div className='ml-2 w-96'>
          <div className="flex items-center border border-gray-700 rounded-md shadow-lg bg-gray-800 text-white">
            <FaSearch className="mx-3 text-teal-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search for hospitals..."
              className="w-full p-2 pl-10 border-none rounded-l-none rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="relative z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
              {suggestions.map((hospital) => (
                <li
                  key={hospital.id}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-700 text-white"
                  onClick={() => handleSelectSuggestion(hospital)} // Render route on hospital suggestion click
                >
                  <FaMapMarkerAlt className="text-teal-400 mr-2" />
                  {hospital.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Sidebar Hospital */}
      {selectedCoordinates && (
        <SideBarHospital hospitals={hospitals} searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default SearchBox;
