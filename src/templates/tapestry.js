import React from "react"
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"
import SEO from '../components/SEO/SEO'
import { FormattedMessage } from "react-intl"
import { FaOm } from "react-icons/fa"


const TapestryPageTemplate = ({
  imageCardSL,
  image,
  heading,

  title,
  content,
  contentComponent,
  tags,
  langKey
}) => {
  const PageContent = contentComponent || Content
  return (
    <div>
      <div
    className="full-width-image margin-top-0"
    style={{
      backgroundImage: `url(${
        !!image.childImageSharp ? image.childImageSharp.fluid.src : image
      })`,
      backgroundPosition: `top left`,
      backgroundAttachment: `fixed`,
    }}
  >
    <div
      style={{
        display: 'flex',
        height: '150px',
        lineHeight: '1',
        justifyContent: 'space-around',
        alignItems: 'left',
        flexDirection: 'column',
      }}
    >
      <h1
        className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen is-centered animated bounceInLeft"
        style={{
          boxShadow:
            '#b71540 0.5rem 0px 0px, #b71540 -0.5rem 0px 0px',
          backgroundColor: '#b71540',
          color: 'white',
          lineHeight: '1',
          padding: '0.25em',
        }}
      >
        {title}
      </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen animated bounceInRight"
          style={{
            boxShadow:
              '#b71540 0.5rem 0px 0px, #b71540 -0.5rem 0px 0px',
            backgroundColor: '#b71540',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {heading}
        </h3>
       </div>
       </div>
       <section className="section">
          <PageContent className="container content" content={content} />
            <TagList tags={tags} langKey={langKey}/>
        </section>


      </div>
)
}

TapestryPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class TapestryPage extends React.Component {
  
    render() {
      let data;
      let dataMarkdown = [];
      if (this.props.data !== null) {
        dataMarkdown = this.props.data.markdownRemark
        data = this.props.data;
      }
      const jsonData = data.allArticlesJson.edges[0].node.articles;
      const langKey = dataMarkdown.frontmatter.lang
      const { frontmatter } = data.markdownRemark;
      const image = frontmatter.image.childImageSharp.fluid.src;
      return (
        <Layout className="content" data={this.props.data} jsonData={jsonData} location={this.props.location}>
          <SEO
            frontmatter={frontmatter}
            postImage={image}
          />
          <div>
            <TapestryPageTemplate
            imageCardSL={dataMarkdown.frontmatter.imageCardSL}
            image={dataMarkdown.frontmatter.image}
            heading={dataMarkdown.frontmatter.heading}
            mainpitch={dataMarkdown.frontmatter.mainpitch}
            main={dataMarkdown.frontmatter.main}
            testimonials={dataMarkdown.frontmatter.testimonials}
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            langKey={langKey}
             />
        </div>
        
        <div id="container_content">
          <div id="container_explications_tapisserie">
            <h1 class="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen is-centered">
              <FormattedMessage id="titre_tapisserie"/>
            </h1>
            <h2 class="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
              <FormattedMessage id="explications_tapisserie2"/>
            </h2>

          </div>

          <div class="titre_tapisserie">
            <p>Extrait n°1 : TITRE A COMPLETER</p>
          </div>

          <div id="container_tapisserie">

            <div class="william">
                <img  src="/img/cartes/adapted/william_card_resize_no_border.png" alt="zoom test" />
                <audio
                    controls
                    src="">
                </audio>
            </div>

            <div class="knight">
                <img  src="/img/cartes/adapted/knight_card_resize_no_border_v2.png" alt="zoom test" />
                  <audio
                    controls
                    src="">
                  </audio>
            </div>  

            <div class="relic1">
                <img  src="/img/cartes/adapted/relic1_card_resize_no_border.png" alt="zoom test" />
                  <audio
                    controls
                    src="">
                  </audio>
            </div>  

            <div class="bayeux">
                <img  src="/img/cartes/adapted/bayeux_card_resize_no_border.png" alt="zoom test" />
                  <audio
                    controls
                    src="">
                  </audio>
            </div>  


          </div>
        </div>
        
        </Layout>

      )
    }
  }

TapestryPage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
        heading
      }
      fields {
        slug
      }
    }
  }
  `