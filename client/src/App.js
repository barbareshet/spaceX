import React from 'react';

import './App.css';

import Launches from "./components/Lunches";
import Logo from "./components/Logo";
import {BrowserRouter as Router} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import Footer from "./components/Footer";


const client = new ApolloClient({

    uri: '/graphql',
    cache: new InMemoryCache()
})

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
            <div className="container">
                <Logo />
                <Launches/>
                <Footer/>
            </div>
            </Router>
        </ApolloProvider>

    );
}

export default App;