import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import React from 'react'
import icon from './assets/icon.png'
import L from 'leaflet'

export default function Map({ x, y, displayName }) {
  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  })

  const MapView = () => {
    let map = useMap()
    map.setView([y, x], map.getZoom())

    return null
  }

  return (
    <div style={{ height: '40vh', width: '70vh' }}>
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={[y, x]}
        zoom={17}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
          contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={customIcon} position={[y, x]}>
          <Popup>{displayName}</Popup>
        </Marker>
        <MapView />
      </MapContainer>
    </div>
  )
}
