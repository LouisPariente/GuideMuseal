import React from 'react'
import { Link } from 'gatsby'
import select from '../components/utils'
import { FormattedMessage } from 'react-intl';
import menuTree from '../data/menuTree'
//import { FaFacebook, FaTwitter, FaInstagram, FaVimeo, FaLinkedin } from 'react-icons/fa';
import Copyright from '../components/Copyright'
import ScrollToTop from '../components/ScrollToTop'
import logo from '../img/logo.png'

const Footer = class extends React.Component {
  render() {
    const props = this.props;
    const sel = select(props.langKey);
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="Logo Guide Museal"
            style={{ width: '20em', height: '6em' }}
          />
        </div>
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
              <div className="columns">
                <div className="column is-4">
                <section className="menu">
                    <ul className="menu-list" >
                      <li ><Link to={"/" + props.langKey} className="navbar-item"><FormattedMessage id="home" /></Link></li>
                      <li><Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.navigation[sel] +"/"}><FormattedMessage id="navigation" /></Link></li>
                      <li><Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.acces_art[sel] +"/"}><FormattedMessage id="acces_art" /></Link></li>
                      <li><Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.f2t[sel] +"/"}><FormattedMessage id="F2T" /></Link></li>
                    </ul>
                  </section>
                </div>
                <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li><Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.tapestry[sel] +"/"}><FormattedMessage id="tapestry" /></Link></li>
                    <li><Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.about[sel] +"/"}><FormattedMessage id="about" /></Link></li>
                    <li><Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.contact[sel] +"/"}><FormattedMessage id="contact" /></Link></li>
                  </ul>
                </section>
                </div>
              </div>
            </div>
            <Copyright />
        </div>
        <ScrollToTop/>
      </footer>
    )
  }
}

export default Footer
