import React from 'react'
import NewsSlider from '../../../Widgets/NewsSlider/Slider'
import NewsList from '../../../Widgets/NewsList/NewsList'

const index = () => {
    return (
        <div> 
      <NewsSlider
      type="featured"
      settings={{dots:false}}
      start={0}
      amount={3}/>
      <NewsList 
      type='cardMain'
      loadMore={true}
      start={3}
      amount={10}/>
      </div>

    )
}

export default index
