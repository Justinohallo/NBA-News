import React from 'react'
import VideoList from "../../../Widgets/VideoList/VideoList"

const index = () => {
    return (
       <VideoList 
       type="card"
       title={false}
       loadmore={true}
       start={0}
       amount={10}/>
    )
}

export default index
