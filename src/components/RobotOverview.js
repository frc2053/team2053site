import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const RobotOverview = ({ name, image, wins, losses, awards, events }) => (
  <div className="robot-info-container">
    <div className="columns">
      <div className="column">
        <h4 style={{ textAlign: "center" }}>Robot Name: {name}</h4>
        <PreviewCompatibleImage
          imageInfo={{
            image: image,
            alt: `picture of robot`,
            style: { margin: "0px auto", width: "75%", borderRadius: "10px" }
          }}
        />
      </div>
      <div className="column">
        <h5 style={{ textAlign: "center", marginBottom: "0" }}>
          Record: {wins} Wins - {losses} Losses
        </h5>
        <hr className="solid" color="#E6E8E6" style={{ width: "50%", margin: "auto", marginBottom: "20px", marginTop: "20px" }}></hr>
        <h5 style={{ textAlign: "center", marginBottom: "0" }}>Events:</h5>
        {events.map((award, index) => (
          <div key={index}>
            <p style={{ textAlign: "center" }}>{award}</p>
          </div>
        ))}
        <hr className="solid" color="#E6E8E6" style={{ width: "50%", margin: "auto", marginBottom: "20px", marginTop: "20px" }}></hr>
        <h5 style={{ textAlign: "center", marginBottom: "0" }}>Awards:</h5>
        {awards.map((award, index) => (
          <div key={index}>
            <p style={{ textAlign: "center" }}>{award}</p>
          </div>
        ))}
      </div>
    </div>
  </div >
)

RobotOverview.propTypes = {
  name: PropTypes.string,
  image: PropTypes.object,
  wins: PropTypes.number,
  losses: PropTypes.number,
  awards: PropTypes.array,
  events: PropTypes.array
}

export default RobotOverview
