import React from "react"
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"

const TapestryPageTemplate = ({ title, content, contentComponent, tags, langKey }) => {
    const PageContent = contentComponent || Content
    return (
        <div className="container content">
         <h1 className="title animated bounceInLeft">{title}</h1>
          <section className="section">
            <PageContent className="container content" content={content} />
            <TagList tags={tags} langKey={langKey}/>
          </section>
        </div>
  )
  }

TapestryPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class TapestryPage extends React.Component {

    render() {
      var dataMarkdown = [];
      if (this.props.data !== null) {
        dataMarkdown = this.props.data.markdownRemark
      }
      const jsonData = this.props.data.allArticlesJson.edges[0].node.articles;
      const { frontmatter } = dataMarkdown;
      const image = frontmatter.image.childImageSharp.fluid.src;
      const langKey = frontmatter.lang;
      const tags = frontmatter.tags;
      return (
        <Layout className="container" data={this.props.data} jsonData={jsonData} location={this.props.location}>
          <SEO
            frontmatter={frontmatter}
            postImage={image}
          />
          <div>
              <TapestryPageTemplate
              contentComponent={HTMLContent}
              title={dataMarkdown.frontmatter.title}
              content={dataMarkdown.html}
              tags={tags}
              langKey={langKey}
               />
          </div>
        <div>Musique : Var Det Du · Ensemble Galilei</div>
        <audio src="/sound/var-det-du.mp3" controls>
            Votre navigateur ne semble pas supporter ce fichier audio
        </audio>
        <img src="/img/4504.jpg"></img>

        </Layout>
      )
    }
  }

TapestryPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TapestryPage

export const pageQuery = graphql`
  query TapestryPageQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    allArticlesJson(filter:{title:{eq:"home"}}){
   edges{
     node{
       articles {
         en
         fr
       }
     }
   }
 }
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        id
        title
        description
        tags
        lang
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
              src
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
  `