import React from 'react'
import { initCanvas, initCursor } from 'helpers/cursor.js'


const Cursor = () => { //renders custom cursor and calls functions to make them work as expected
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    if(!loaded) {
      initCursor()
      initCanvas()
      setLoaded(true)
    }
  }, [ loaded, setLoaded ])
  return (
  <React.Fragment>
    <div className='cursor cursor-inner'></div>
    <canvas resize='true' className='cursor cursor-outer'></canvas>
  </React.Fragment>
  )
}

export default Cursor