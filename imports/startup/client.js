import { Meteor } from 'meteor/meteor'

import React from 'react'
import { render } from 'react-dom'

import { ApolloProvider } from 'react-apollo'
import { ApolloLink, from } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'

import './shared'

import App from '/imports/ui/App'

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql')
})

const authLink = new ApolloLink((operation, forward) => {
  const token = Accounts._storedLoginToken()
  operation.setContext(() => ({
    headers: {
      'meteor-login-token': token
    }
  }))
  return forward(operation)
})

const cache = new InMemoryCache()

const defaultState = {
  locale: {
    __typename: 'String',
    defaultLocale: 'EN'
  }
}

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      setLocale(obj, { locale }, { cache }) {
        console.log(locale)
      }
    }
  }
})

const client = new ApolloClient({
  link: from([stateLink, authLink, httpLink]),
  cache
})

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'))
})