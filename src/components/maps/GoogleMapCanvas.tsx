import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps';
import { GeoLocationRecord } from '../../data/kenyaGeoData';
import {
  MapPin,
  Compass,
  Navigation,
  Layers,
  Phone,
  Clock,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Car,
  Footprints,
  Info,
  Key
} from 'lucide-react';

// Source: Google Maps Platform Code Assist
// Mandatory Internal Attribution ID
const ATTRIBUTION_ID = 'gmp_mcp_codeassist_v1_aistudio';

interface GoogleMapCanvasProps {
  locations: GeoLocationRecord[];
  selectedLocation: GeoLocationRecord | null;
  onSelectLocation: (loc: GeoLocationRecord) => void;
  userCoords: { lat: number; lng: number } | null;
  centerCoords: { lat: number; lng: number };
  zoomLevel: number;
  routeWaypoints?: GeoLocationRecord[];
  mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
}

// Inner helper component that uses useMapsLibrary('routes') to render routes
const RouteRenderer: React.FC<{
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  waypoints?: { lat: number; lng: number }[];
}> = ({ origin, destination, waypoints }) => {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!routesLib || !map) return;

    if (polyline) {
      polyline.setMap(null);
      setPolyline(null);
    }

    try {
      const routesAny = routesLib as any;
      if (routesAny?.Route?.computeRoutes) {
        const request: any = {
          origin,
          destination,
          travelMode: routesAny.TravelMode.DRIVING,
          intermediates: waypoints && waypoints.length > 0 ? waypoints : undefined,
          fields: ['polyline', 'distanceMeters', 'duration', 'viewport']
        };

        routesAny.Route.computeRoutes(request)
          .then((response: any) => {
            if (response.routes && response.routes.length > 0) {
              const route = response.routes[0];
              if (route.polyline && route.polyline.encodedPolyline) {
                const geom = (window as any).google?.maps?.geometry?.encoding;
                const path = geom
                  ? geom.decodePath(route.polyline.encodedPolyline)
                  : [origin, ...(waypoints || []), destination];
                const newPolyline = new google.maps.Polyline({
                  path,
                  geodesic: true,
                  strokeColor: '#f85a5a',
                  strokeOpacity: 0.9,
                  strokeWeight: 5,
                  map
                });
                setPolyline(newPolyline);
              }

              if (route.viewport) {
                const bounds = new google.maps.LatLngBounds(
                  route.viewport.southwest,
                  route.viewport.northeast
                );
                map.fitBounds(bounds);
              }
            }
          })
          .catch((err: any) => {
            console.warn('Google Maps route calculation notice:', err);
          });
      } else {
        // Fallback straight-line polyline if computeRoutes is unavailable
        const path = [origin, ...(waypoints || []), destination];
        const newPolyline = new google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: '#f85a5a',
          strokeOpacity: 0.9,
          strokeWeight: 4,
          map
        });
        setPolyline(newPolyline);
      }
    } catch (e) {
      console.warn('Routes API computeRoutes execution:', e);
    }

    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
    };
  }, [routesLib, map, origin, destination, waypoints]);

  return null;
};

// Category Pin Color & Icon Styling
function getCategoryPinStyle(category: string): { bg: string; glyphColor: string; border: string } {
  switch (category) {
    case 'park':
      return { bg: '#15803d', glyphColor: '#ffffff', border: '#166534' }; // Emerald Green
    case 'beach':
      return { bg: '#0284c7', glyphColor: '#ffffff', border: '#0369a1' }; // Sky Blue
    case 'mountain':
      return { bg: '#7c3aed', glyphColor: '#ffffff', border: '#6d28d9' }; // Purple
    case 'hotel':
      return { bg: '#d97706', glyphColor: '#ffffff', border: '#b45309' }; // Amber
    case 'restaurant':
      return { bg: '#ea580c', glyphColor: '#ffffff', border: '#c2410c' }; // Orange
    case 'hospital':
      return { bg: '#dc2626', glyphColor: '#ffffff', border: '#b91c1c' }; // Red
    case 'police':
      return { bg: '#1e3a8a', glyphColor: '#ffffff', border: '#172554' }; // Navy
    case 'airport':
      return { bg: '#0891b2', glyphColor: '#ffffff', border: '#0e7490' }; // Cyan
    case 'transport':
      return { bg: '#475569', glyphColor: '#ffffff', border: '#334155' }; // Slate
    case 'fuel':
      return { bg: '#ca8a04', glyphColor: '#ffffff', border: '#a16207' }; // Yellow
    case 'culture':
      return { bg: '#9333ea', glyphColor: '#ffffff', border: '#7e22ce' }; // Violet
    case 'viewpoint':
      return { bg: '#059669', glyphColor: '#ffffff', border: '#047857' }; // Teal
    default:
      return { bg: '#f85a5a', glyphColor: '#ffffff', border: '#dc2626' }; // Kenya Coral
  }
}

// Interactive Vector Canvas Fallback Component when Google Maps API key is not present or offline
const VectorKenyaMapFallback: React.FC<{
  locations: GeoLocationRecord[];
  selectedLocation: GeoLocationRecord | null;
  onSelectLocation: (loc: GeoLocationRecord) => void;
  userCoords: { lat: number; lng: number } | null;
  centerCoords: { lat: number; lng: number };
  zoomLevel: number;
  routeWaypoints?: GeoLocationRecord[];
}> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  userCoords,
  centerCoords,
  routeWaypoints
}) => {
  // Bounding box of Kenya: Lat ~ -4.7 to 5.0, Lng ~ 33.9 to 41.9
  // We project Lat/Lng into 0-100% relative coordinates
  const minLat = -4.8;
  const maxLat = 4.8;
  const minLng = 33.8;
  const maxLng = 42.0;

  const projectToPercent = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    return { x: Math.max(3, Math.min(97, x)), y: Math.max(3, Math.min(97, y)) };
  };

  // Pre-calculate route line points
  const routePoints = useMemo(() => {
    if (!routeWaypoints || routeWaypoints.length < 2) return '';
    return routeWaypoints
      .map((w) => {
        const { x, y } = projectToPercent(w.coordinates.lat, w.coordinates.lng);
        return `${x},${y}`;
      })
      .join(' ');
  }, [routeWaypoints]);

  return (
    <div className="relative w-full h-full min-h-[520px] bg-[#0c1824] rounded-2xl overflow-hidden border border-stone-800 flex flex-col items-center justify-center select-none">
      {/* Top Banner with Demo Key Guidance */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 bg-stone-900/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-xs text-stone-300 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-white">Kenya Interactive Vector Map</span>
          <span className="hidden md:inline text-stone-400">• Coordinates & Route Projection Active</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f85a5a] hover:bg-[#e04848] text-white font-medium rounded-lg transition-colors shadow"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Connect Google Maps Demo Key</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* SVG Map Canvas with Kenya Contour & Region Grid */}
      <div className="relative w-full h-full min-h-[500px] flex items-center justify-center p-6">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-h-[560px] drop-shadow-2xl overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Subtle Geographic Grid Lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            </pattern>
            {/* Coral Gradient for Route */}
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f85a5a" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>

          <rect width="100" height="100" fill="url(#grid)" />

          {/* Stylized Kenya Geographic Land Silhouette */}
          <path
            d="M 28 8 
               C 38 7, 52 5, 62 10 
               C 74 15, 88 18, 92 28 
               C 95 38, 92 50, 85 62 
               C 78 72, 72 82, 68 92 
               C 56 86, 42 88, 32 82 
               C 22 75, 14 62, 12 50 
               C 10 38, 16 22, 28 8 Z"
            fill="#132337"
            stroke="#264567"
            strokeWidth="0.8"
            strokeDasharray="1.5 1.5"
            className="transition-all duration-500 hover:fill-[#172b43]"
          />

          {/* Lake Victoria Stylized Bay (West) */}
          <path
            d="M 12 50 C 14 56, 10 65, 16 68 C 20 62, 18 52, 12 50 Z"
            fill="#0369a1"
            opacity="0.6"
          />

          {/* Lake Turkana (North West) */}
          <path
            d="M 26 12 C 29 20, 28 28, 25 36 C 23 28, 24 18, 26 12 Z"
            fill="#0284c7"
            opacity="0.7"
          />

          {/* Indian Ocean (Coastline South East) */}
          <path
            d="M 72 82 C 78 72, 85 62, 92 58 L 98 95 L 68 95 Z"
            fill="#0284c7"
            opacity="0.25"
          />

          {/* Equator Line Indicator (approx 0 deg lat = y ~ 50%) */}
          <line
            x1="5"
            y1="50"
            x2="95"
            y2="50"
            stroke="#f59e0b"
            strokeWidth="0.4"
            strokeDasharray="2 2"
            opacity="0.4"
          />
          <text x="8" y="49" fill="#f59e0b" fontSize="2.2" opacity="0.6" fontWeight="bold">
            EQUATOR 0°00'
          </text>

          {/* Active Planned Route Polyline */}
          {routePoints && (
            <polyline
              points={routePoints}
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2 1"
              className="animate-pulse"
            />
          )}

          {/* User Location Marker if available */}
          {userCoords && (
            <g
              transform={`translate(${projectToPercent(userCoords.lat, userCoords.lng).x}, ${
                projectToPercent(userCoords.lat, userCoords.lng).y
              })`}
            >
              <circle r="3.5" fill="#38bdf8" opacity="0.3" className="animate-ping" />
              <circle r="2" fill="#0284c7" stroke="#ffffff" strokeWidth="0.6" />
              <circle r="0.8" fill="#ffffff" />
            </g>
          )}

          {/* Render All Filtered Location Pins */}
          {locations.map((loc) => {
            const { x, y } = projectToPercent(loc.coordinates.lat, loc.coordinates.lng);
            const isSelected = selectedLocation?.id === loc.id;
            const style = getCategoryPinStyle(loc.category);

            return (
              <g
                key={loc.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => onSelectLocation(loc)}
                className="cursor-pointer group"
              >
                {/* Highlight Halo for Selected Marker */}
                {isSelected && (
                  <circle r="4" fill="#f85a5a" opacity="0.4" className="animate-ping" />
                )}

                {/* Pin Shadow */}
                <ellipse cx="0" cy="1.6" rx="1.8" ry="0.8" fill="#000000" opacity="0.4" />

                {/* Pin Head */}
                <circle
                  r={isSelected ? '2.4' : '1.8'}
                  fill={style.bg}
                  stroke={isSelected ? '#ffffff' : style.border}
                  strokeWidth={isSelected ? '0.7' : '0.4'}
                  className="transition-transform duration-200 transform group-hover:scale-125"
                />

                {/* Pin Dot Center */}
                <circle r={isSelected ? '0.9' : '0.6'} fill="#ffffff" />

                {/* Label on Hover / Selection */}
                {(isSelected || locations.length <= 15) && (
                  <text
                    x="0"
                    y="-3"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="2.1"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    className="drop-shadow-md select-none pointer-events-none"
                  >
                    {loc.name.length > 18 ? loc.name.slice(0, 16) + '…' : loc.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Bottom Quick Location Ticker */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between bg-stone-900/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 text-xs shadow-xl">
        <div className="flex items-center gap-2 truncate">
          <MapPin className="w-4 h-4 text-[#f85a5a] shrink-0" />
          <span className="text-stone-300 truncate">
            {selectedLocation ? (
              <>
                <strong className="text-white">{selectedLocation.name}</strong> ({selectedLocation.county} County)
              </>
            ) : (
              'Click any marker pin on the map to inspect details, coordinates & routes'
            )}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 text-stone-400">
          <span>{locations.length} Points of Interest</span>
        </div>
      </div>
    </div>
  );
};

export const GoogleMapCanvas: React.FC<GoogleMapCanvasProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  userCoords,
  centerCoords,
  zoomLevel,
  routeWaypoints,
  mapType = 'roadmap'
}) => {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const mapId = (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string) || 'DEMO_MAP_ID';

  // If no Google Maps API Key is configured, seamlessly render the high-performance interactive vector fallback
  if (!apiKey || apiKey.trim() === '') {
    return (
      <VectorKenyaMapFallback
        locations={locations}
        selectedLocation={selectedLocation}
        onSelectLocation={onSelectLocation}
        userCoords={userCoords}
        centerCoords={centerCoords}
        zoomLevel={zoomLevel}
        routeWaypoints={routeWaypoints}
      />
    );
  }

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden border border-stone-800 shadow-xl">
      <APIProvider apiKey={apiKey} libraries={['places', 'routes', 'geometry']}>
        <Map
          id="explore-kenya-map"
          className="w-full h-full min-h-[520px]"
          defaultCenter={centerCoords}
          defaultZoom={zoomLevel}
          center={centerCoords}
          zoom={zoomLevel}
          mapId={mapId}
          mapTypeId={mapType}
          gestureHandling="greedy"
          disableDefaultUI={false}
          internalUsageAttributionIds={[ATTRIBUTION_ID]}
        >
          {/* User Current GPS Position Marker */}
          {userCoords && (
            <AdvancedMarker position={userCoords} title="Your Current Location">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping" />
                <span className="relative w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold">
                  📍
                </span>
              </div>
            </AdvancedMarker>
          )}

          {/* All Filtered Points of Interest */}
          {locations.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            const style = getCategoryPinStyle(loc.category);

            return (
              <AdvancedMarker
                key={loc.id}
                position={loc.coordinates}
                onClick={() => onSelectLocation(loc)}
                title={loc.name}
              >
                <Pin
                  background={isSelected ? '#f85a5a' : style.bg}
                  glyphColor={style.glyphColor}
                  borderColor={isSelected ? '#ffffff' : style.border}
                  scale={isSelected ? 1.3 : 1.0}
                />
              </AdvancedMarker>
            );
          })}

          {/* Active Route Rendering when 2+ Waypoints exist */}
          {routeWaypoints && routeWaypoints.length >= 2 && (
            <RouteRenderer
              origin={routeWaypoints[0].coordinates}
              destination={routeWaypoints[routeWaypoints.length - 1].coordinates}
              waypoints={
                routeWaypoints.length > 2
                  ? routeWaypoints.slice(1, -1).map((w) => w.coordinates)
                  : undefined
              }
            />
          )}

          {/* Info Window for Selected Marker */}
          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.coordinates}
              onCloseClick={() => {}}
              headerContent={
                <div className="text-xs font-bold text-stone-900 pr-2">
                  {selectedLocation.name}
                </div>
              }
            >
              <div className="text-xs text-stone-700 max-w-[220px]">
                <p className="line-clamp-2 mb-1">{selectedLocation.description}</p>
                <div className="flex items-center gap-1 text-[11px] text-stone-500">
                  <MapPin className="w-3 h-3 text-[#f85a5a]" />
                  <span>{selectedLocation.town}, {selectedLocation.county} County</span>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};
