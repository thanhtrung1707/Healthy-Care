import React, { Component } from 'react'
import FooterTop from './FooterTop'
import FooterMiddle from './FooterMiddle'
import style from '../../componets/Footer/style.css'
import { Col, Row } from 'antd'

export default class Footer extends Component {
  render() {
    return (
      <Col className="footer" >
        {/* Begin Footer Static Top Area */}
        <FooterTop></FooterTop>
        {/* Footer Static Top Area End Here */}

        {/* Begin Footer Static Middle Area */}
        <FooterMiddle></FooterMiddle>
        {/* Footer Static Middle Area End Here */}
      </Col>
    )
  }
}
