import React from 'react';
import style from './videoList.scss'
import VideoListTemplate from './VideoListTemplate'

const VideoRelated = (props) => {
    return (
        <div className={style.relatedWrapper}>
           <VideoListTemplate 
           data={props.data}
           teams={props.teams}/>
           Video Related
        </div>
    )
}

export default VideoRelated
