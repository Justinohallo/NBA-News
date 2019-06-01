import React from 'react'
import SideNavItems from './SideNav_items'
import SideNavigation from "react-simple-sidenav"


const SideNav = (props) => {
    return (
        <div>
            <SideNavigation
            showNav={props.showNav}
            onHideNav={props.onHideNav}

            navStyle={{
                background:'#242424',
                maxWidth:'220px'
            }}> 
                <SideNavItems/>
            </SideNavigation>
       
       
        
        </div>
    )
}

export default SideNav
