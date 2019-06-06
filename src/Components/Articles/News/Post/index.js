import React, { Component } from 'react';
import {firebaseDB, firebaseLooper, firebaseTeams} from '../../../../firebase'

import styles from '../../articles.scss'
import Header from './Header'


export class index extends Component {

    state ={
        article:[],
        team:[]
    }

    componentWillMount(){
        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val()
            console.log(article)        
            firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team = firebaseLooper(snapshot)
                this.setState({
                    article,
                    team
                })
            }).catch((e)=>console.log)
        })
    }
    render() {
       const article = this.state.article
       const team = this.state.team

        return (
            <div className={styleMedia.articleWrapper}>
                    <Header
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}/>

                    <div className={styles.articleBody}
                    
                    > 
                    <h1> {article.title} </h1>
                    <div className={styles.articleImage}
                    style={{
                        background:`url(../images/articles/${article.image})`
                    }}>
                        </div>
                        <div className={styles.articleText}> {article.body} </div>
                    </div>
                    
            </div>
        )
    }
}

export default index
