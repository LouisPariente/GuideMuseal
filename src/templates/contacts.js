import React from "react"
import * as PropTypes from "prop-types"
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import ContactDetails from "../components/ContactDetails"
import OsmMap from '../components/OsmMap'
import { getCurrentLangKey } from 'ptz-i18n';
import { Format } from 'react-intl-format';

const ContactPageTemplate = ({
  title, content, contentComponent,
  infos, image, address, phone, email,
}) => {
  const PageContent = contentComponent || Content
  return (
      <section className="section">
        <div className="container">
          <div className="content">
      <h1 className="title">{title}</h1>
      <PageContent className="container content" content={content} />
      <ContactDetails
      infos={infos}
      image={image}
      address={address}
      phone={phone}
      email={email}
      />
      </div>
    </div>
    </section>
)
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  };
  render() {
    let dataMarkdown = [];
    let data;
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark;
      data = this.props.data;
    }
    const location = this.props.location;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    const address = dataMarkdown.frontmatter.address;
    const phone = dataMarkdown.frontmatter.phone;
    const email = dataMarkdown.frontmatter.email;
    const locations = dataMarkdown.frontmatter.locations;
    const { lat } = locations;
    const { lng } = locations;
    const { message } = locations;
    const image = dataMarkdown.frontmatter.imageCardSL;
    const { frontmatter } = dataMarkdown;
    const imageSEO = frontmatter.image.childImageSharp.fluid.src;
    return (
      <Layout className="container"  data={data} jsonData={jsonData} location={location}>
        <SEO
          frontmatter={frontmatter}
          postImage={imageSEO}
        />
          <Format>
           {intl => (
            <div className="container">
                <ContactPageTemplate
                contentComponent={HTMLContent}
                infos={intl.formatMessage({ id: 'contact.infos' })}
                image={image}
                address={address}
                phone={phone}
                email={email}
                title={dataMarkdown.frontmatter.title}
                content={dataMarkdown.html}
                 />
            </div>
          )}
        </Format>
        <OsmMap lat={lat} lng={lng} message={message}/>
    </Layout>
    )
  }
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage;

export const pageQuery = graphql`
  query ContactPageQuery($id: String!) {
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
        address
        phone
        email
        locations{
          lat
          lng
          message
        }
        linkinsta
        instagram
        imageCardSL{
          alt
          image{
            childImageSharp {
              fluid(maxWidth: 128, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          description
          website
        }
      }
      fields {
        slug
      }
    }
  }
`
