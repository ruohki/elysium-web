import React from 'react'

import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

const App = ({ locale }) => (
  <div>
    {console.log(locale)}
    Cool App Inc.
  </div>
)

export default compose(
  graphql(gql`
    query {
      locale @client {
        defaultLocale
      }
    }
  `, {
    props: ({ data: { locale }}) => ({
      locale
    })
  })
)(App)