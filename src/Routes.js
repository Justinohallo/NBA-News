import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'

// Components 

export class Routes extends Component {
    render() {
        return (

           <Switch>
               <Route path='/' exact compoent={Home}/>
           </Switch>
        )
    }
}

export default Routes
