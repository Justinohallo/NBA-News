import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
// Components
import Home from './Components/Home/Home'
import Layout from './HOC/Layout/Layout'


// Components 

export class Routes extends Component {
    render() {
        return (
         
            <Layout>
                <Switch>
               <Route path='/' exact component={Home}/>
                </Switch>
            </Layout>
                
                
         
         
        )
    }
}

export default Routes
