import React, { Component } from 'react'
import {firebaseArticles, firebaseLooper} from '../../../firebase'

import SliderTemplates from './SliderTemplates'

export class Slider extends Component {

    state = {
        news:[]
    }

    componentWillMount(){
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{
          const news = firebaseLooper(snapshot)
            this.setState({news})
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
