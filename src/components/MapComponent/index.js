import React, { Component } from 'react'
import './style.scss'

class MapComponent extends Component {
  createMapContent = () => {
    const { notifications } = this.props
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -22.8547769, lng: -43.2432046 },
      zoom: 15,
    })
    this.markers = notifications.map((marker, index) => {
      this.newMarker = new window.google.maps.Marker({
        position: { lat: marker.lat, lng: marker.long },
        map: this.map,
        title: marker.location,
        index,
      })

      this.newMarker.addListener('click', e => {
        this.handleMarkerClick(index)
        if (this.infowindow) {
          this.infowindow.close()
        }
        this.infowindow = new window.google.maps.InfoWindow({
          content: `${marker.category} (${marker.location})`,
        })
        this.infowindow.setPosition(e.latLng)
        this.infowindow.open(this.map)
        return null
      })
      return this.newMarker
    })

    this.markerCluster = new window.MarkerClusterer(this.map, this.markers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    })
  }

  handleMarkerClick = index => {
    const { notifications, setInfoMap } = this.props
    setInfoMap(notifications[index])
  }

  componentDidMount() {
    this.createMapContent()
  }

  render() {
    return <div id="map" className="MapComponent" />
  }
}

export default MapComponent
