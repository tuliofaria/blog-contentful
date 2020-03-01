import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const EmailCapture = ({
  title,
  description,
  ctaButton,
  redirect,
  currentURL
}) => {
  const doRedirect = () => {
    window.location = redirect
  }
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={doRedirect}>{ctaButton}</button>
      <p>{currentURL}</p>
    </div>
  )
}
const buildOptions = currentURL => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <strong className='meu-strong'>{text}</strong>
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className='meu-h1'>{children}</h1>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className='meu-p'>{children}</p>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
        <img
          src={node.data.target.fields.file['en-US'].url}
          alt={node.data.target.fields.title['en-US']}
        />
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        if (node.data.target.sys.contentType.sys.id === 'emailCapture') {
          return (
            <EmailCapture
              title={node.data.target.fields.title['en-US']}
              description={node.data.target.fields.description['en-US']}
              ctaButton={node.data.target.fields.ctaButton['en-US']}
              redirect={node.data.target.fields.redirect['en-US']}
              currentURL={currentURL}
            />
          )
        }
        return null
      }
    }
  }
  return options
}

const Post = ({ data, path }) => {
  return (
    <div>
      <h1>{data.contentfulPost.title}</h1>
      {/*<img src={data.contentfulPost.featuredImage.fixed.src} /> */}
      <Image fixed={data.contentfulPost.featuredImage.fixed} />
      <div
        dangerouslySetInnerHTML={{
          __html: data.contentfulPost.content.childMarkdownRemark.html
        }}
      />
      <div>
        {documentToReactComponents(
          data.contentfulPost.contentRich.json,
          buildOptions(path)
        )}
      </div>
    </div>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }, visible: { eq: true }) {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
      featuredImage {
        fixed(width: 480, height: 320) {
          ...GatsbyContentfulFixed
        }
      }
      contentRich {
        json
      }
    }
  }
`
export default Post
