import React, { Component } from 'react'
import axios from 'axios'
import {URL} from '../../../../config'
import Header from './Header'
import VideoRelated from '../../../Widgets/VideoList/VideoRelated'

import styles from '../../articles.scss'

export class Index extends Component {

    state={
        article:[],
        team:[],
        teams:[],
        related:[]
    }

    componentWillMount(){
        axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
        .then(response => {
            let article = response.data[0];
            axios.get(`${URL}/teams?id=${article.team}`)
            .then(response => {
                this.setState({
                    article, 
                    team:response.data
                })
                this.getRelated()

            })
           
        })
    }

    getRelated = () => {
        axios.get(`${URL}/teams`)
        .then(response => {
            
            let teams = response.data
            axios.get(`${URL}/videos/?q=${this.state.team[0].city}&_limit=3`)
            .then (response =>{
                console.log(response)
                this.setState({
                    teams, 
                    related:response.data
                })
            })
        })
    }
    render() {
        const article = this.state.article;
        const team = this.state.team; 
        return (
            <div>
                <Header teamData={team[0]}/>
                <div className={styles.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe
                    title="videoplayer"
                    width="100%"
                    height="300px"
                    src={`https://www.youtube.com/embed/${article.url}`}>
                    </iframe>
                </div>
                <VideoRelated 
                data={this.state.related}
                teams={this.state.teams}
                />
            </div>
        )
    }
}

export default Index
