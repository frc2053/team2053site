import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import RobotOverview from '../components/RobotOverview'

const CORSStr = "?origin=https://team2053.org";

export const GameHistoryTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  game_video_url,
  robot_video_url,
  robot_name,
  image,
  wins,
  losses,
  awards,
  events,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            <RobotOverview name={robot_name} image={image} wins={wins} losses={losses} awards={awards} events={events} />
            {game_video_url ? (
              <div style={{ marginTop: `4rem` }}>
                <h3>Game Reveal Video</h3>
                <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + game_video_url + CORSStr} title="YouTube video player 1"></iframe>
              </div>
            ) : null}
            {robot_video_url ? (
              <div style={{ marginTop: `4rem` }}>
                <h3>Robot Reveal Video</h3>
                <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + robot_video_url + CORSStr} title="YouTube video player 2"></iframe>
              </div>
            ) : null}
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

GameHistoryTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  game_video_url: PropTypes.string,
  robot_video_url: PropTypes.string,
  robot_name: PropTypes.string,
  image: PropTypes.object,
  wins: PropTypes.number,
  losses: PropTypes.number,
  awards: PropTypes.array,
  events: PropTypes.array,
}

const GameHistoryEntry = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <GameHistoryTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Game History">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        game_video_url={post.frontmatter.game_video_url}
        robot_video_url={post.frontmatter.robot_video_url}
        robot_name={post.frontmatter.robot_name}
        image={post.frontmatter.image}
        wins={post.frontmatter.wins}
        losses={post.frontmatter.losses}
        awards={post.frontmatter.awards}
        events={post.frontmatter.events}
      />
    </Layout>
  )
}

GameHistoryEntry.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default GameHistoryEntry

export const pageQuery = graphql`
  query GameHistoryEntryByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        game_video_url
        robot_video_url
        robot_name
        image {
          childImageSharp {
            fluid(maxWidth: 700, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        wins
        losses
        awards
        events
      }
    }
  }
`
