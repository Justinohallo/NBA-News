import React from 'react'

import Slider from "../Widgets/NewsSlider/Slider"
import NewsList from '../Widgets/NewsList/NewsList'

const Home = () => {
    return (
        <div>
            <Slider
            type='featured'
            start={0}
            amount={3}
            settings={{
                dots:false}}
                />
          <NewsList 
          type='card'
          loadMore={true}
          start={3}
        amount={3}

          />
        </div>
    )
}

export default Home
