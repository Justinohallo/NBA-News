import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
// Components
import Home from './Components/Home/Home'
import Layout from './HOC/Layout/Layout'
import NewsArticle from './Components/Articles/News/Post/index'
import VideoArticle from './Components/Articles/Videos/Video/Index'
import NewsMain from "./Components/Articles/News/Main/index"
import VideosMain from './Components/Articles/Videos/Main/index'
import SignIn from './Components/SignIn/SignIn'
import Dashboard from './Components/Dashboard/Dashboard'


// Components 

const Routes = (props) => {
    
        return (
            <Layout user={props.user}>
                <Switch>
               <Route path='/' exact component={Home}/>
               <Route path='/news' exact component={NewsMain}/>
               <Route path='/articles/:id' exact component={NewsArticle}/>
               <Route path='/videos/:id' exact component={VideoArticle}/>
               <Route path='/videos' exact component={VideosMain}/>
               <Route path='/sign-in' exact component={SignIn}/>
               <Route path='/dashboard' exact component={Dashboard}/>
                </Switch>
            </Layout>
        )
    }


export default Routes
