import { Col, Row } from 'antd'
import React, { Component } from 'react'


export default class FooterTop extends Component {
  render() {
    return (
      <Row className="footer-static-top">
        <Row className="container">
          {/* Begin Footer Shipping Area */}
          <Row className="footer-shipping pt-60 pb-55 pb-xs-25">
            <Row className="row">
              {/* Begin Li's Shipping Inner Box Area */}
              <Col className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                <Col className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/T47vHYx/1.png" alt="Shipping Icon" />
                  </div>
                  <Col className="shipping-text">
                    <h2>Free Delivery</h2>
                    <p>And free returns. See checkout for delivery dates.</p>
                  </Col>
                </Col>
              </Col>
              {/* Li's Shipping Inner Box Area End Here */}
              {/* Begin Li's Shipping Inner Box Area */}
              <Col className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/fdWjv2v/2.png" alt="Shipping Icon" />
                  </div>
                  <Col className="shipping-text">
                    <h2>Safe Payment</h2>
                    <p>Pay with the world's most popular and secure payment methods.</p>
                  </Col>
                </div>
              </Col>
              {/* Li's Shipping Inner Box Area End Here */}
              {/* Begin Li's Shipping Inner Box Area */}
              <Col className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/tbLjsRY/3.png" alt="Shipping Icon" />
                  </div>
                  <Col className="shipping-text">
                    <h2>Shop with Confidence</h2>
                    <p>Our Buyer Protection covers your purchasefrom click to delivery.</p>
                  </Col>
                </div>
              </Col>
              {/* Li's Shipping Inner Box Area End Here */}
              {/* Begin Li's Shipping Inner Box Area */}
              <Col className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/GvHXW7z/4.png" alt="Shipping Icon" />
                  </div>
                  <Col className="shipping-text">
                    <h2>24/7 Help Center</h2>
                    <p>Have a question? Call a Specialist or chat online.</p>
                  </Col>
                </div>
              </Col>
              {/* Li's Shipping Inner Box Area End Here */}
            </Row>
          </Row>
          {/* Footer Shipping Area End Here */}
        </Row>
        </Row>
      

    )
  }
}
