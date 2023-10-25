import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGooglePlus, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

import './style.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-static-top">
          <div className="container">
            <Row gutter={16}>
              <Col span={6}>
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/T47vHYx/1.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>Free Delivery</h2>
                    <p>And free returns. See checkout for delivery dates.</p>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/fdWjv2v/2.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>Safe Payment</h2>
                    <p>Pay with the world's most popular and secure payment methods.</p>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/tbLjsRY/3.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>Shop with Confidence</h2>
                    <p>Our Buyer Protection covers your purchase from click to delivery.</p>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="li-shipping-inner-box">
                  <div className="shipping-icon">
                    <img src="https://i.ibb.co/GvHXW7z/4.png" alt="Shipping Icon" />
                  </div>
                  <div className="shipping-text">
                    <h2>24/7 Help Center</h2>
                    <p>Have a question? Call a Specialist or chat online.</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="footer-static-middle">
          <div className="container">
            <Row gutter={16}>
              <Col span={8}>
                <div className="footer-logo"></div>
                <ul className="des">
                  <li><span>Address: </span>6688 Princess Road, London, Greater London BAS 23JK, UK</li>
                  <li><span>Phone: </span><a href="/">(+123) 123 321 345</a></li>
                  <li><span>Email: </span><a href="mailto:info@yourdomain.com">info@yourdomain.com</a></li>
                </ul>
              </Col>
              <Col span={4}>
                <div className="footer-block">
                  <h3 className="footer-block-title">Product</h3>
                  <ul>
                    <li><a href="/">Prices drop</a></li>
                    <li><a href="/">New products</a></li>
                    <li><a href="/">Best sales</a></li>
                    <li><a href="/">Contact us</a></li>
                  </ul>
                </div>
              </Col>
              <Col span={4}>
                <div className="footer-block">
                  <h3 className="footer-block-title">Our company</h3>
                  <ul>
                    <li><a href="/">Delivery</a></li>
                    <li><a href="/">Legal Notice</a></li>
                    <li><a href="/">About us</a></li>
                    <li><a href="/">Contact us</a></li>
                  </ul>
                </div>
              </Col>
              <Col span={8}>
                <div className="footer-block">
                  <h3 className="footer-block-title">Follow Us</h3>
                  <ul className="social-link">
  <li className="social-icon twitter">
    <a href="https://twitter.com/" data-toggle="tooltip" title="Twitter">
      <FontAwesomeIcon icon={faTwitter} />
    </a>
  </li>
  <li className="social-icon google-plus">
    <a href="URL_CUA_GOOGLE_PLUS" data-toggle="tooltip" title="Google Plus">
      <FontAwesomeIcon icon={faGooglePlus} />
    </a>
  </li>
  <li className="social-icon facebook">
    <a href="https://www.facebook.com/" data-toggle="tooltip" title="Facebook">
      <FontAwesomeIcon icon={faFacebook} />
    </a>
  </li>
  <li className="social-icon youtube">
    <a href="URL_CUA_YOUTUBE" data-toggle="tooltip" title="Youtube">
      <FontAwesomeIcon icon={faYoutube} />
    </a>
  </li>
  <li className="social-icon instagram">
    <a href="URL_CUA_INSTAGRAM" data-toggle="tooltip" title="Instagram">
      <FontAwesomeIcon icon={faInstagram} />
    </a>
  </li>
</ul>
                </div>
                <div className="footer-newsletter">
                  <h4>Sign up to newsletter</h4>
                  <form action="/" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="footer-subscribe-form validate" noValidate>
                    <div id="mc_embed_signup_scroll">
                      <div id="mc-form" className="mc-form subscribe-form form-group">
                        <input id="mc-email" type="email" autoComplete="off" placeholder="Enter your email" />
                        <button className="btn" id="mc-submit">Subscribe</button>
                      </div>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
