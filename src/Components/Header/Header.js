import React from 'react'
import {Link} from 'react-router-dom'
import style from './header.css'

import FontAwesome from 'react-fontawesome'
import SideNav from './SideNav/SideNav'

const Header = (props) => {

    const navBars = () => (
        <div className={style.bars}>
            <FontAwesome name='bars'
            onClick={props.onOpenNav}
            style={{
                color:'#fdfdfd',
            padding:'10px'}}
                />
        </div>
    )


    const logo = () =>(
            <Link to='/' className={style.logo}> 
            <img alt='NBA LOGO' src='/images/nba_logo.png'> 
          </img></Link>
    )
    return (
        <header className={style.header}>
            <SideNav {...props}/>
            <div className={style.headerOpt}> 
                {navBars()}
                {logo()}

            </div>
        </header>
    )
}

export default Header
