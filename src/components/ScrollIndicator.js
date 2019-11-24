import React from 'react'
import { TweenMax, Power1 } from 'gsap'
import { debounce } from 'underscore'
import s from './components.module.css'

let screenPercentage = null

export const ScrollBar = ({ parent }) => {
  const [ progressRef, setProgressRef ] = React.useState(null)
  const [ container, setContainerRef ] = React.useState(null)
  const [ dragId, setDragId ] = React.useState(null)
  const [ dragActive, setDragActive ] = React.useState(true)
  const vw = document.documentElement.clientWidth

  React.useEffect(() => {
    const handleScroll = e => {
      const _parent = document.querySelector(`.${parent.classList[0]}`)
      const { scrollLeft, scrollWidth, clientWidth } = _parent
      const percentage = (scrollLeft + clientWidth) / scrollWidth * 100
      TweenMax.to(progressRef, .1, { width: `${percentage}%`, ease: Power1.easeInOut })
    }

    const handleDrag = e =>  {
      e.preventDefault()
      if(e.type === 'mousedown') {
        setDragActive(true)
        if(!dragId && dragActive) {
          const id = setInterval(() => {
            if(dragActive) {
              execDrag()
            }
          }, 50)
          setDragId(id)
        }
      } else {
        setDragActive(false)
        setDragId(null)
        window.clearInterval(dragId)
      }
    }

    const execDrag = () => {
      let value = (parent.scrollWidth / 100 * screenPercentage) - parent.clientWidth
      if(value > parent.scrollWidth) {
        console.log('out of bounds')
      }
      console.log(value)
      TweenMax.to(parent, .3, { scrollLeft: value, ease: Power1.easeInOut })
    }

    const handleMouseMove = e => {
      screenPercentage = e.clientX / vw * 100
    }

    if(parent && progressRef && container) {
      parent.addEventListener('scroll', handleScroll)
      container.addEventListener('mousedown', handleDrag)
      window.addEventListener('mouseup', handleDrag)
      window.addEventListener('mousemove', handleMouseMove)
    }

  }, [ parent, progressRef, container, dragId, vw, dragActive ])
  return (
    <div className={s.scrollBar} ref={div => setContainerRef(div)}>
      <div className={`${s.scrollBarProgress} link hover-end`} ref={div => setProgressRef(div)}></div>
    </div>
  )
}

