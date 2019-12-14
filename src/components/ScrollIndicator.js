import React from 'react'
import { TweenMax, Power1 } from 'gsap'
import { checkSectionChange } from 'helpers/nav.js'
import s from './components.module.css'

let screenPercentage = null

export const ScrollBar = ({ parent, history, drag, className }) => {
  const [ dragId, setDragId ] = React.useState(null)
  const [ dragActive, setDragActive ] = React.useState(true)
  const progressRef = React.useRef(null)
  const container = React.useRef(null)
  const vw = document.documentElement.clientWidth

  React.useEffect(() => {

    const handleScroll = () => {
      const _parent = document.querySelector(`.${parent.classList[0]}`)
      const { scrollTop, scrollHeight, clientHeight } = _parent
      let percentage = (scrollTop + clientHeight) / scrollHeight * 100
      TweenMax.to(progressRef.current, .125, { height: `${percentage}%`, ease: Power1.easeInOut })
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
      TweenMax.to(parent, .3, { scrollLeft: value, ease: Power1.easeInOut })
      checkSectionChange(parent.scrollLeft, history)
    }

    const handleMouseMove = e => {
      screenPercentage = e.clientX / vw * 100
    }

    console.log(parent)

    if(parent && progressRef.current && container.current) {
      parent.addEventListener('scroll', handleScroll)
      if(drag) {
        container.addEventListener('mousedown', handleDrag)
        window.addEventListener('mouseup', handleDrag)
        window.addEventListener('mousemove', handleMouseMove)
      }


    }

  }, [ parent, progressRef, container, dragActive, dragId, vw, history, drag ])
  return (
    <div className={`${s.scrollBar} ${className ? className : ''}`} ref={container}>
      <div className={`${s.scrollBarProgress} ${drag ? 'link hover-end' : ''}`} ref={progressRef}></div>
    </div>
  )
}