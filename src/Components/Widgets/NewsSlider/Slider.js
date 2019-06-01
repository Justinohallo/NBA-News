import React, { Component } from 'react'
import axios from 'axios'

import SliderTemplates from './SliderTemplates'

export class Slider extends Component {

    state = {
        news:[]
    }

    componentWillMount(){
        // Before the Render
        axios.get(`http://localhost:3004/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        .then(response => {
            this.setState({
                news:response.data
            })
        })
    }

    render() {
        console.log(this.state.news)
        return (
            <div>
                <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
            
            </div>
        )
    }
}

export default Slider
