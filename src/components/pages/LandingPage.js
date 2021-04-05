import React from 'react';
import Hospitality from '../../assets/images/hospitality';

import { Link } from 'react-router-dom';

const LandingPage = ({setApp}) => {
    return (
        <div className="landing-page">
        
          <section className="intro">
            <div style={{display:"flex", alignItems: "center"}}>
              <img alt="Hospitality Staff" src="https://freesvg.org/img/publicdomainq-business-drinking-party.png"/>
            </div>
            <div>
              <header>
                <h1>ServiceLearn</h1>
              </header>
              <h3 className="tagline">A Interactive Staff Training System <br/> Designed for Hospitality staff, by Hospitality Staff</h3>
              <Link to="/training"><button onClick={()=>setApp(true)}>Enter Training</button></Link>
            </div>
          </section>
          <section className="explanation">
            <div>
              <h2>Why use ServiceLearn?</h2>
              <ul>
                <li>Teaches you wide variety of skills ready for work</li>
                <li>Designed to be an engaging experience </li>
                <li>Works cross-platform, on laptop, mobile or whiteboard etc.</li>
              </ul>
            </div>
            <figure className="video">
              <div className="videoWrapper">
                <iframe title="ServiceLearn - Prototype Demo Video" src="https://www.youtube.com/embed/4-5onF-uLFU" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </figure>
          </section>
          <section className="reviews">
            <h2>User Reviews</h2>
            <ul>
              <li>Teaches you wide variety of skills ready for work</li>
              <li>Designed to be an engaging experience </li>
              <li>Works cross-platform, on laptop, mobile or whiteboard etc.</li>
            </ul>
          </section>
          <footer>
            <p>UWE Bristol</p>
            <p>Made with ReactJS, Redux and react-three-fiber</p>
            <p>Developed by <a href="http://quincegorerodney.panel.uwe.ac.uk/portfolio/">Quince Gore-Rodney</a></p>
            <p>2020</p>
          </footer>
      </div>
    )
}

export default LandingPage