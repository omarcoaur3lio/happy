import Leaflet from 'leaflet'
import mapMarkerImg from '../images/map-marker.svg'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [38, 68],
    iconAnchor: [19, 68],
    popupAnchor: [180, 2]
  })

  export default mapIcon;