import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import RobotOverview from '../components/RobotOverview'

export const GameHistoryTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  game_video_url,
  robot_video_url
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
            <RobotOverview name="TESTNAME" image="img/logo.svg" wins="54" losses="2" awards={["BIG AWARD", "HUGE AWARD"]} events={["PAVA", "MEME"]} />
            {game_video_url ? (
              <div style={{ marginTop: `4rem` }}>
                <h3>Game Reveal Video</h3>
                <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + game_video_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            ) : null}
            {robot_video_url ? (
              <div style={{ marginTop: `4rem` }}>
                <h3>Robot Reveal Video</h3>
                <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + robot_video_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
  robot_video_url: PropTypes.string
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
      }
    }
  }
`
