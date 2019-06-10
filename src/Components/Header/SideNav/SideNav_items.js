import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import style from './sideNav.css';
import {firebase} from '../../../firebase'

import FontAwesome from 'react-fontawesome';

const SideNav_items = (props) => {

const items = [
    {
        type: style.option,
        icon:'home',
        text:'Home',
        link:'/',
        login:''
    },
    {
        type: style.option,
        icon:'fa fa-search',
        text:'News',
        link:'/news',
        login:''
    },
    {
        type: style.option,
        icon:'home',
        text:'Dashboard',
        link:'/dashboard',
        login:false
    },
    {
        type: style.option,
        icon:'play',
        text:'Videos',
        link:'/videos',
        login:''
    },
    {
        type: style.option,
        icon:'fas fa-sign-in-alt',
        text:'Sign-In',
        link:'/sign-in',
        login:true
    },
    {
        type: style.option,
        icon:'fas fa-sign-out-alt',
        text:'Sign-Out',
        link:'/sign-out',
        login:false
    }
]

const element = (item, i) =>(
    <div key={i} className={item.type}>
    <Link to={item.link}>
        <FontAwesome name={item.icon}/>
        {item.text}
    </Link>
</div> 

)

const restrictedElement = (item, i) => { 
    let template = null; 

    if(props.user === null && item.login){
        template = element(item, i)
    } 

    if(props.user !== null && !item.login){
        if(item.link === '/sign-out'){
            template = (
                <div key={i} 
                className={item.type}
                onClick={()=>{
                    firebase.auth()
                    .signOut()
                    .then(()=>{
                        props.history.push('/')
                    })
                }}>
                    <FontAwesome name={item.icon}/>
                    {item.text}
            </div> 
            )

        } else {
            template = element(item, i)
        }

    }


    return template;
}

const showItems = () => {
    return items.map((item, i) =>{
     return(  
       item.login !== '' ? 
       restrictedElement(item, i)
       :
       element(item, i)

     )})
}

    return (
        <div> 
          {showItems()}
        </div>
       
    )
}



export default withRouter(SideNav_items)    