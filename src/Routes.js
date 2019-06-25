import React from 'react'
import { Switch} from 'react-router-dom'
// Components
import Home from './Components/Home/Home'
import Layout from './HOC/Layout/Layout'
import NewsArticle from './Components/Articles/News/Post/index'
import VideoArticle from './Components/Articles/Videos/Video/Index'
import NewsMain from "./Components/Articles/News/Main/index"
import VideosMain from './Components/Articles/Videos/Main/index'
import SignIn from './Components/SignIn/SignIn'
import Dashboard from './Components/Dashboard/Dashboard'

import PrivateRoutes from './Components/AuthRoutes/PrivateRoutes'
import PublicRoutes from './Components/AuthRoutes/publicRoutes'


// Components 

const Routes = (props) => {
    
        return (
            <Layout user={props.user}>
                <Switch>
               <PublicRoutes  {...props} restricted={false} path='/' exact component={Home}/>
               <PublicRoutes  {...props} restricted={false} path='/news' exact component={NewsMain}/>
               <PublicRoutes  {...props} restricted={false} path='/articles/:id' exact component={NewsArticle}/>
               <PublicRoutes  {...props} restricted={false} path='/videos/:id' exact component={VideoArticle}/>
               <PublicRoutes  {...props} restricted={false} path='/videos'  exact component={VideosMain}/>
               <PublicRoutes  {...props} path='/sign-in' restricted={true} exact component={SignIn}/>
               <PrivateRoutes {...props} path='/dashboard' exact component={Dashboard}/>
                </Switch>
            </Layout>
        )
    }


export default Routes
