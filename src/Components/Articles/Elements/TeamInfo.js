import React from 'react'
import style from '../articles.scss'

const TeamInfo = (props) => {
    return (
        <div className={style.articleTeamHeader}>
            <div className={style.left}
            style={{
                background:`url('/images/teams/${props.team.logo}')`
            }}>

            </div>
            <div className={style.right}>
                <div>
                    <span> {props.team.city} {props.team.name}</span>
                </div>
                <strong>
                W{props.team.stats[0].wins}-L{props.team.stats[0].defeats}
            </strong>
            </div>
           
            
        </div>
    )
}

export default TeamInfo
