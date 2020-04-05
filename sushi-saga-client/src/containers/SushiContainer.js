import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

  return (
    <Fragment>
      <div className="belt">
        {
          props.sushis.map(sushi => <Sushi onEatSushi={(sushi) => props.onEatSushi(sushi)}
                                           sushi={sushi}
                                           hasEaten={props.eaten.includes(sushi)}
                                           key={sushi.id}/>)
        }
        <MoreButton onMoreSushi={props.onMoreSushi} />
      </div>
    </Fragment>
  )
}

export default SushiContainer
