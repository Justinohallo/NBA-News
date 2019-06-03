import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
// Components
import Home from './Components/Home/Home'
import Layout from './HOC/Layout/Layout'
import NewsArticle from './Components/Articles/News/Post/index'
import VideoArticle from './Components/Articles/Videos/Video/Index'
import NewsMain from "./Components/Articles/News/Main/index"
import VideosMain from './Components/Articles/Videos/Main/index'


// Components 

export class Routes extends Component {
    render() {
        return (
            <Layout>
                <Switch>
               <Route path='/' exact component={Home}/>
               <Route path='/news' exact component={NewsMain}/>
               <Route path='/articles/:id' exact component={NewsArticle}/>
               <Route path='/videos/:id' exact component={VideoArticle}/>
               <Route path='/videos' exact component={VideosMain}/>
                </Switch>
            </Layout>
        )
    }
}

export default Routes
