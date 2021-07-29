import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './styles/styles.css'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const client = new ApolloClient({
	uri: process.env.REACT_APP_GRAPH_CMS,
	cache: new InMemoryCache(),
})

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Provider store={store}>
				<App />
			</Provider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
