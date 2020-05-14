import React from "react"
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import ImageMapper from 'react-image-mapper'; 
import ReactDOM from 'react-dom';

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
      const texte_defaut = <h1>Survolez un element pour avoir des informations</h1>
      const texte_roi = <h1>ZONE 1 A COMPLETER</h1>;
      function setText(){
        ReactDOM.render(texte_roi, document.getElementById('root'));
      }
      function setDefaut(){
        ReactDOM.render(texte_defaut, document.getElementById('root'));
      }
      
      return (
        <Layout className="container" data={this.props.data} jsonData={jsonData} location={this.props.location}>
        <div>Musique : Var Det Du · Ensemble Galilei</div>
        <audio src="/sound/var-det-du.mp3" controls>
            Votre navigateur ne semble pas supporter ce fichier audio
        </audio>
        <div class="container_image">
          <img src="/img/4501_low.jpg" usemap="#tapisserie"/>
          <div id="root" class="top_right">Survolez un élément pour avoir des informations</div>
        </div>
        <map name="tapisserie">
            <area class="zoom" shape="poly" coords="650,272,735,250,745,320,793,346,835,411,843,525,815,579,706,587,666,487,682,374,708,340"
            onMouseOver={(setText)} onMouseOut={(setDefaut)}/>
        </map>
        

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