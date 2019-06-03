import React from 'react'
import style from '../articles.scss'

const PostData = (props) => {
    return (
        <div className={style.articlePostData}>
            <div>    Date: 
            <span> {props.data.date} </span></div>
            <div>    Author: 
            <span> {props.data.author} </span></div>
        </div>
    )
}

export default PostData

