import React from 'react'
import {Link} from 'react-router-dom'
import style from './sideNav.css';

import FontAwesome from 'react-fontawesome';



const items = [
    {
        type: style.option,
        icon:'home',
        text:'Home',
        link:'/'
    },
    {
        type: style.option,
        icon:'fa fa-search',
        text:'News',
        link:'/news'
    },
    {
        type: style.option,
        icon:'play',
        text:'Videos',
        link:'/videos'
    },
    {
        type: style.option,
        icon:'fas fa-sign-in-alt',
        text:'Sign-In',
        link:'/sign-in'
    },
    {
        type: style.option,
        icon:'fas fa-sign-out-alt',
        text:'Sign-Out',
        link:'/sign-out'
    }
]

const showItems = () => {
    return items.map((item, i) =>{
     return(  
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div> 

     )})
}
const SideNav_items = () => {
    return (
        <div> 
          {showItems()}
        </div>
       
    )
}

export default SideNav_items
