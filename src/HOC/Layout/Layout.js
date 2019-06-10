import React, { Component } from 'react'
import './layout.css'

// COMPONENTS

import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

export class Layout extends Component {

    state = {
        showNav:false
        
    }

    toggleSideNav = (action) => {
        this.setState({
            showNav: action
        })
    }
    render() {
        return (
            <div>
                <Header
                user={this.props.user}
                showNav={this.state.showNav}
                onHideNav={() => this.toggleSideNav(false)}
                onOpenNav={()=> this.toggleSideNav(true)}
                />
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

export default Layout
