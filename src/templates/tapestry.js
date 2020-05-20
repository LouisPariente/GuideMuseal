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
      const texte_roi = <h1>Guillaume et ses témoins rencontrent pour la première fois Harold.
      La position de Guillaume étant la même que celle du roi Edouard au début de la tapisserie 
      </h1>;
      // Fonctions High res
      function setDefautHigh(){
        ReactDOM.render(texte_defaut, document.getElementById('text_high'));
      }
      function setTextHigh(){
        ReactDOM.render(texte_roi, document.getElementById('text_high'));
      }
      // Fonctions low res
      function setDefautLow(){
        ReactDOM.render(texte_defaut, document.getElementById('text_low'));
      }
      function setTextLow(){
        ReactDOM.render(texte_roi, document.getElementById('text_low'));
      }

      return (

        <Layout className="container" data={this.props.data} jsonData={jsonData} location={this.props.location}>
        <div>Explications de la scene</div>
        <audio src="/sound/william1.wav" controls>
            Votre navigateur ne semble pas supporter ce fichier audio
        </audio> <br></br>

        <div class="high_res">
          <div class="container_image">
            <img src="/img/4525_low.jpg" usemap="#tapisserie"/>
            <div id="text_high" class="top_right">Survolez un élément pour avoir des informations</div>
          </div>

          <map name="tapisserie">
              <area shape="rect" coords="800,340,1150,800"
              onMouseOver={(setTextHigh)} onMouseOut={(setDefautHigh)}/>
          </map>
        </div>

        <div class="low_res">
          <div class="container_image">
            <img src="/img/4525_low_800px.jpg" usemap="#tapisserie_2"/>
            <div id="text_low" class="top_right">plop un élément pour avoir des informations</div>
          </div>

          <map name="tapisserie_2">
              <area shape="rect" coords="457,221,617,441"
              onMouseOver={(setTextLow)} onMouseOut={(setDefautLow)}/>
          </map>
        </div>

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