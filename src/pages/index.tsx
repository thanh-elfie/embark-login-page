import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { withPrefix } from "gatsby"
import queryString from "query-string";
import { StaticImage } from "gatsby-plugin-image"
import { Property } from "csstype"

const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const container = {
  ...flexCenter,
  height: '100vh',
}

const backgroundImageContainer = {
  gridArea: "1/1",
  position: "relative" as Property.Position,
  display: "grid",
}

const pageStyles = {
  marginTop: 250,
}

const partnershipText = {
  ...flexCenter,
  color: '#6E7191',
  fontSize: 10,
  marginTop: 50,
  marginBottom: 14,
}

const buttonWrapper = {
  ...flexCenter,
  marginTop: 50,
}

const buttonLink = {
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 24,
  paddingRight: 24,
  borderRadius: 20,
  width: 290,
  fontSize: 16,
  backgroundColor: '#14142B',
  color: '#FFF',
  textDecoration: 'none',
  textAlign: "center" as Property.TextAlign,
}

const redirectAfterText = {
  ...flexCenter,
  marginTop: 16,
  color: '#6E7191',
  fontSize: 16
}

const IndexPage: React.FC<PageProps> = () => {
  const [url, setUrl] = React.useState('#')
  const [redirectAfter, setRedirectAfter] = React.useState(5)
  
  React.useEffect(() => {
    const params = queryString.parse(location.search);
    const redirectBaseUri = params.redirect
    const redirectLink = `${redirectBaseUri}/embark?action=authen&token=${params.token}`
    const completeRedirectUrl = `${redirectBaseUri}?amv=${params.amv}&apn=${params.apn}&ibi=${params.apn}&imv=0&link=${encodeURIComponent(redirectLink)}`
    setUrl(completeRedirectUrl)
  })

  React.useEffect(() => {
    if (redirectAfter > 0) {
      setTimeout(() => setRedirectAfter(redirectAfter - 1), 1000)
    } else {
      window.open(url)
    }
  }, [redirectAfter])

  return (
    <>
      <main style={container}>
        <div style={{ display: "grid", height: '100%', width: '100%' }}>
          <StaticImage
            style={{gridArea: "1/1"}}
            layout="fullWidth"
            alt=""
            src="../images/background.png"
            formats={["auto", "webp", "avif"]}
          />
          <div style={backgroundImageContainer}>
            <div style={pageStyles}>
            <div style={flexCenter}>
              <StaticImage width={169} src="../images/elfie-logo.png" alt="Elfie" />
            </div>
            <div>
              <div style={partnershipText}>In partnership with</div>
              <div style={flexCenter}>
                <StaticImage width={108} src="../images/wtw-logo.png" alt="Elfie" />
              </div>
            </div>
            <div style={buttonWrapper}>
              <a id="deeplinkURL" style={buttonLink} target="_blank" href={url}>
                Go to Elfie
              </a>
            </div>
            <div style={redirectAfterText}>
              Redirected after {redirectAfter} seconds
            </div>
          </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
