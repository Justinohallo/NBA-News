import React from 'react'
import style from './videoList.scss'

import {Link} from 'react-router-dom'
import CardInfo from '../Card Info/CardInfo'


const VideoListTemplate = (props) => {
    return (
        props.data.map((item, i) => (
             <Link to={`/videos/${item.id}`} key={i}>
                <div className={style.videoListItem__wrapper}>
                    <div className={style.left } style={{
                        background:`url(../images/videos/${item.image})`
                    }}>
                    <div></div>
                    </div>   
                <div
                className={style.right}>
                    <CardInfo teams={props.teams} team={item.team} date={item.date}/>
                    <h2> {item.title}</h2>
                </div>
                </div>
            </Link>
        ))
    )
    
}

export default VideoListTemplate
