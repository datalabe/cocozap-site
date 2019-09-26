import React, { Component } from 'react'
import Header from './Header'
import MenuBar from './MenuBar'
import MapComponent from './MapComponent'
import MapInfo from './MapInfo'
import Participate from './Participate'
import AccessData from './AccessData'
import About from './About'
import SocialMediaBar from './SocialMediaBar'
import dataMarkers from '../data/markers'
import './layout.scss'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapInfo: {
        date: 20181019,
        picture: '20181019_0033_972730791',
        description:
          'Oi olha só aqui no esgoto da casa 206! Tá um fedor insuportável! Já fiz reclamções na Cedae, e eles disseram que este esgoto precisa de fazer obra e é que isso não é da alçada deles , e sim do dono. Toda vez esse esgoto fica vazando.',
        category: 'Esgoto a Céu Aberto',
        frequency: 'Frequentemente',
        address: 'Rua Massaranduba, 206',
        location: 'Parque Rubens Vaz',
        lat: -22.852344,
        long: -43.2429,
        triedToSolve: 'sim',
        externalHelp: '-',
        totalAmount: 39,
        categoryAmount: 5,
      },
    }
  }

  handleMapInfo(info) {
    const totalAmount = dataMarkers.length
    const categoryItems = dataMarkers.filter(item => {
      return item.category.toUpperCase() === info.category.toUpperCase()
    })
    console.log(categoryItems)
    const categoryAmount = categoryItems.length

    this.setState({
      mapInfo: {
        ...info,
        totalAmount,
        categoryAmount,
      },
    })
  }

  render() {
    const { mapInfo } = this.state
    return (
      <div>
        <Header />
        <MenuBar />
        <MapComponent setInfoMap={info => this.handleMapInfo(info)} />
        <MapInfo {...mapInfo} />
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
