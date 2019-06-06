import React, { Component } from 'react';
import style from "./videoList.scss"
import {firebaseTeams, firebaseVideos, firebaseLooper} from '../../../firebase'

import Button from '../Buttons/Button'
import VideosTemplate from './VideoListTemplate'

export class VideoList extends Component {

    state={
        teams:[],
        videos:[],
        start:this.props.start,
        end:this.props.start + this.props.amount,
        amount: this.props.amount
    }

    componentWillMount(){
        this.request(this.state.start, this.state.amount)
    }

    request = (start, end) => {
        if(this.state.teams.length <1 ){
            firebaseTeams.once('value')
            .then((snapshot)=> {
                const teams = firebaseLooper(snapshot)
                this.setState({
                    teams
                })
            })
        }
       
        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot)=>{ 
            const articles = firebaseLooper(snapshot);   
            this.setState({
                videos:[...this.state.videos, ...articles],
                start,
                end})
    }).catch(e=>{console.log(e)})
    }

    renderVideos = () => {
        let template = null; 
        switch(this.props.type){
            case('card'):
            template = <VideosTemplate data={this.state.videos} teams={this.state.teams}/>
            break;
            default: 
            template = null;
        }
        return template;
    }

    loadMore = ()  => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end +1, end )
}

    renderButton = () => {
        return this.props.loadmore ?
        <Button
        type='loadMore'
        loadMore={()=>this.loadMore()}
        cta='Load More Videos'/>
        : 
        <Button type='linkTo' cta='More Videos' linkTo='/videos'/> 
    }
    renderTitle = () => {
        return this.props.title ?
        <h3> NBA</h3> 
        : null
    }
    render() {
        return (
            <div className={style.videoList__wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }
}



export default VideoList
