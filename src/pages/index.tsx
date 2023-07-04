import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import queryString from "query-string";

const pageStyles = {
  padding: 96
}

const IndexPage: React.FC<PageProps> = () => {
  const handleGoToElfie = () => {
    const params = queryString.parse(location.search);
    const redirectBaseUri = params.redirect
    const redirectLink = `${redirectBaseUri}/embark?action=authen&token=${params.token}`
    const completeRedirectUrl = `${redirectBaseUri}?amv=${params.amv}&apn=${params.apn}&ibi=${params.apn}&imv=0&link=${encodeURIComponent(redirectLink)}`
    window.location.replace(completeRedirectUrl)
  }
  return (
    <main style={pageStyles}>
      <button onClick={handleGoToElfie}>Go to Elfie</button>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
