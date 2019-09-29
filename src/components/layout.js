import React, { Component } from 'react'
import Header from './Header'
import MenuBar from './MenuBar'
import MapComponent from './MapComponent'
import MapInfo from './MapInfo'
import Participate from './Participate'
import AccessData from './AccessData'
import About from './About'
import SocialMediaBar from './SocialMediaBar'
import { API } from '../services/API'

import './layout.scss'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notifications: [],
      mapInfo: {},
    }
    this.handleMapInfo = this.handleMapInfo.bind(this)
  }

  componentDidMount() {
    API.getNotifications().then(res => {
      this.setState({
        notifications: res.data,
        mapInfo: {
          ...res.data[0],
          categoryAmount: this.getCategoryTotal(res.data[0], res.data),
          totalAmount: res.data.length,
        },
      })
    })
  }

  getCategoryTotal = (marker, dataMarkers) => {
    const categoryItems = dataMarkers.filter(item => {
      return item.category.toUpperCase() === marker.category.toUpperCase()
    })
    const categoryAmount = categoryItems.length
    return categoryAmount
  }

  handleMapInfo(info) {
    const { notifications } = this.state
    const totalAmount = notifications.length
    const categoryAmount = this.getCategoryTotal(info, notifications)

    this.setState({
      mapInfo: {
        ...info,
        totalAmount,
        categoryAmount,
      },
    })
  }

  render() {
    const { mapInfo, notifications } = this.state
    console.log(mapInfo, notifications)
    return (
      <div>
        <Header />
        <MenuBar />
        {notifications.length > 0 ? (
          <MapComponent
            setInfoMap={info => this.handleMapInfo(info)}
            notifications={notifications}
          />
        ) : (
          <div />
        )}
        {notifications.length > 0 ? <MapInfo {...mapInfo} /> : <div />}
        <Participate />
        <AccessData />
        <About />
        <div className="socialMediaBottom">
          <SocialMediaBar />
        </div>
      </div>
    )
  }
}

export default Layout
