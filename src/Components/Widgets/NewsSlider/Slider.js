import React, { Component } from 'react'
import {firebase, firebaseArticles, firebaseLooper} from '../../../firebase'

import SliderTemplates from './SliderTemplates'

export class Slider extends Component {

    state = {
        news:[]
    }

    componentWillMount(){
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{
          const news = firebaseLooper(snapshot)
            
    

        const asyncFunction = (item, i, callBack) => { 
            firebase.storage().ref('images')
                  .child(item.image).getDownloadURL()
                  .then( url => { 
                      news[i].image = url; 
                     callBack()
                  })
        }

           let requests = news.map((item, i)=>{
               return new Promise((resolve) =>{
                asyncFunction(item, i, resolve)
               })
           })
           Promise.all(requests).then(()=>{
               this.setState({
                   news
               })
           })
        })
    }

    render() {
        return (
            <div>
                <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
            
            </div>
        )
    }
}

export default Slider
