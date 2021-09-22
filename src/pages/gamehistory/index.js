import React from 'react'

import Layout from '../../components/Layout'
import GameHistoryRoll from '../../components/GameHistoryRoll'

export default class GameHistoryIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/our-robots.jpg')`,
            backgroundPosition: "50% 50%",
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 rgb(70, 0, 170), -0.5rem 0 0 rgb(70, 0, 170)',
              backgroundColor: 'rgb(70, 0, 170)',
              color: '#FFFFFF',
              padding: '1rem',
            }}
          >
            Our Robots
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <GameHistoryRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}