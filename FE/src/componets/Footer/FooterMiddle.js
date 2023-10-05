import { Col, Row } from 'antd'
import React, { Component } from 'react'

export default class FooterMiddle extends Component {
  render() {
    return (
      <Col className="footer-static-middle">
        <Col className="container">
          <Col className="footer-logo-wrap pt-50 pb-35">
            <Row className="row">
              {/* Begin Footer Logo Area */}
              <Col className="col-lg-4 col-md-6">
                <Row className="footer-logo">
              
                </Row>
                <ul className="des">
                  <li>
                    <span>Address: </span>
                    6688Princess Road, London, Greater London BAS 23JK, UK
            </li>
                  <li>
                    <span>Phone: </span>
                    <a href="/">(+123) 123 321 345</a>
                  </li>
                  <li>
                    <span>Email: </span>
                    <a href="mailto://info@yourdomain.com">info@yourdomain.com</a>
                  </li>
                </ul>
              </Col>
              {/* Footer Logo Area End Here */}
              {/* Begin Footer Block Area */}
              <Col className="col-lg-2 col-md-3 col-sm-6">
                <Col className="footer-block">
                  <h3 className="footer-block-title">Product</h3>
                  <ul>
                    <li><a href="/">Prices drop</a></li>
                    <li><a href="/">New products</a></li>
                    <li><a href="/">Best sales</a></li>
                    <li><a href="/">Contact us</a></li>
                  </ul>
                </Col>
              </Col>
              {/* Footer Block Area End Here */}
              {/* Begin Footer Block Area */}
              <Col className="col-lg-2 col-md-3 col-sm-6">
                <Col className="footer-block">
                  <h3 className="footer-block-title">Our company</h3>
                  <ul>
                    <li><a href="/">Delivery</a></li>
                    <li><a href="/">Legal Notice</a></li>
                    <li><a href="/">About us</a></li>
                    <li><a href="/">Contact us</a></li>
                  </ul>
                </Col>
              </Col>
              {/* Footer Block Area End Here */}
              {/* Begin Footer Block Area */}
              <Row className="col-lg-4">
                <Col className="footer-block">
                  <h3 className="footer-block-title">Follow Us</h3>
                  <ul className="social-link">
                    <li className="twitter">
                      <a href="https://twitter.com/" data-toggle="tooltip" title="Twitter">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li className="rss">
                      <a href="https://rss.com/" data-toggle="tooltip" title="RSS">
                        <i className="fa fa-rss" />
                      </a>
                    </li>
                    <li className="google-plus">
                      <a href="https://www.plus.google.com/discover" data-toggle="tooltip" title="Google Plus">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li className="facebook">
                      <a href="https://www.facebook.com/" data-toggle="tooltip" title="Facebook">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li className="youtube">
                      <a href="https://www.youtube.com/" data-toggle="tooltip" title="Youtube">
                        <i className="fa fa-youtube" />
                      </a>
                    </li>
                    <li className="instagram">
                      <a href="https://www.instagram.com/" data-toggle="tooltip" title="Instagram">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </Col>
                {/* Begin Footer Newsletter Area */}
                <Col className="footer-newsletter">
                  <h4>Sign up to newsletter</h4>
                  <form action="/" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="footer-subscribe-form validate" noValidate>
                    <div id="mc_embed_signup_scroll">
                      <div id="mc-form" className="mc-form subscribe-form form-group">
                        <input id="mc-email" type="email" autoComplete="off" placeholder="Enter your email" />
                        <button className="btn" id="mc-submit">Subscribe</button>
                      </div>
                    </div>
                  </form>
                </Col>
                {/* Footer Newsletter Area End Here */}
              </Row>
              {/* Footer Block Area End Here */}
            </Row>
          </Col>
        </Col>
      </Col>


    )
  }
}
