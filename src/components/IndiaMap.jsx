import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Moon, Sun, MapPin, Users, Square } from 'lucide-react';
import indiaStatesData from '../assets/india_states_simplified.geojson?url';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const IndiaMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load GeoJSON data
    fetch(indiaStatesData)
      .then(response => response.json())
      .then(data => setGeoData(data))
      .catch(error => console.error('Error loading GeoJSON data:', error));
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#3388ff',
          dashArray: '',
          fillOpacity: 0.5
        });
      },
      click: (e) => {
        setSelectedState(feature.properties);
        const layer = e.target;
        layer.setStyle({
          weight: 4,
          color: '#ff7800',
          dashArray: '',
          fillOpacity: 0.8
        });
      }
    });
  };

  const geoJsonStyle = {
    fillColor: '#3388ff',
    weight: 2,
    opacity: 1,
    color: '#3388ff',
    dashArray: '3',
    fillOpacity: 0.5
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Interactive India States Map</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            className="flex items-center space-x-2"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] overflow-hidden">
              <CardContent className="p-0 h-full">
                {geoData && (
                  <MapContainer
                    center={[20.5937, 78.9629]}
                    zoom={5}
                    style={{ height: '100%', width: '100%' }}
                    className="rounded-lg"
                  >
                    <TileLayer
                      url={darkMode 
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      }
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <GeoJSON
                      data={geoData}
                      style={geoJsonStyle}
                      onEachFeature={onEachFeature}
                    />
                  </MapContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* State Information Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>State Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedState ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary">
                        {selectedState.shapeName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedState.shapeISO}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Capital</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedState.capital || 'N/A'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Population</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedState.population || 'N/A'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Square className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Area</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedState.area_sq_km ? `${selectedState.area_sq_km} km²` : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Click on a state to view its information
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Click on any state to view detailed information</li>
                  <li>• Hover over states to highlight them</li>
                  <li>• Use the zoom controls to explore different regions</li>
                  <li>• Toggle between light and dark modes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;

