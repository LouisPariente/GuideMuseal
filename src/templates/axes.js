import React from "react"
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"

const ArtworkTemplate = ({
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

ArtworkTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class axesPage extends React.Component {

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
  const tags = frontmatter.tags;
    return (
      <Layout className="content" data={this.props.data} jsonData={jsonData} location={this.props.location}>
      <SEO
        frontmatter={frontmatter}
        postImage={image}
      />
      <div>
            <ArtworkTemplate
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
      </Layout>
    )
  }
}

axesPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default axesPage

export const pageQuery = graphql`
query axesQuery($id: String!) {
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
   markdownRemark(id: { eq: $id }) {
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
       headingDesc
       description
    }
  }
}
`
