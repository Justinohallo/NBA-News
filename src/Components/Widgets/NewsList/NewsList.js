import React, { Component } from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {URL} from '../../../config'
import style from './newsList.scss'
import Button from '../../Widgets/Buttons/Button'
import CardInfo from '../../Widgets/Card Info/CardInfo'


export class NewsList extends Component {

    state ={
        items:[],
        start:this.props.start,
        end:this.props.start + this.props.amount,
        amount:this.props.amount,
        teams:[]
    }

    componentWillMount(){
       this.request(this.state.start, this.state.end)
    }

    request = (start, end) =>{
        if(this.state.teams.length < 1){
            axios.get(`${URL}/teams`)
            .then(response => {
                this.setState({
                    teams:response.data
                })
            })
        }


        axios.get(`${URL}/articles?_start=${this.state.start}&_end=${this.state.end}`)
        .then(response=> {
            this.setState({
                items:[...this.state.items, ...response.data]
            })
        })
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end, end)
    }
 
    renderNews = (type) =>{
        let template = null; 

        switch(type){
            case('card'):
         
            template = this.state.items.map((item, i) => (
                <CSSTransition
                classNames={{
                    enter:style.newsList__wrapper,
                    enterActive: style.newsList__wrapperEnter
                }}
                timeout={500}
                key={i}
                >

                <div className={style.newsListItem}>
                              <Link to={`/articles/${item.id}`}>
                                  <CardInfo/>> 
                                  <h2> {item.title}</h2>
                              </Link>
              
                          </div>
                          </CSSTransition>
          
            ));
            break;
            default: template= null
        }
        return template;
    }


    render() {
        return (
            <div>
                <TransitionGroup
                component='div'
                className='list'>
                {this.renderNews(this.props.type)}
             

                </TransitionGroup>
                
                <Button 
                type='loadMore'
                loadMore={()=> this.loadMore()}
                cta='Load More News'> 
                </Button>
                

               
            </div>
        )
    }
}

export default NewsList
