import React from 'react'
import FontAwesome from 'react-fontawesome'
import style from './cardInfo.scss'
import moment from 'moment'

const CardInfo = (props) => {

    const teamName = (teams, team) =>{
        let data = teams.find((item)=>{
            return item.teamId === team
        })
        if(data){
            return data.name
        }

    }

    const formatDate = (date) =>{
        return moment(date).format('MM-DD-YYYY')
    }

    return (
        <div className={style.CardInfo}>
            <span className={style.teamName}> {teamName(props.teams, props.team)} </span>
            <span className={style.date}>
                <FontAwesome name='far fa-clock'/>
                {formatDate(props.date)}
            </span>
        </div>
    )
}

export default CardInfo
