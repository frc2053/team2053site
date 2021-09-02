import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const RobotOverview = ({ name, image, wins, losses, awards, events }) => (
  <div className="container">
    <h4>Robot Name: {name}</h4>
    <PreviewCompatibleImage
      imageInfo={{
        image: image,
        alt: `picture of robot`,
      }}
    />
    <span>
      Record: {wins}W : {losses}L
    </span>
    <h5>Events:</h5>
    {events.map((award, index) => (
      <div key={index}>
        <p>{award}</p>
      </div>
    ))}
    <h5>Awards:</h5>
    {awards.map((award, index) => (
      <div key={index}>
        <p>{award}</p>
      </div>
    ))}
  </div>
)

RobotOverview.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  wins: PropTypes.string,
  losses: PropTypes.string,
  awards: PropTypes.array,
  events: PropTypes.array
}

export default RobotOverview
