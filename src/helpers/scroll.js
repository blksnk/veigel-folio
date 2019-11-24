import { TweenMax } from 'gsap'
import appStyle from 'App.module.css'

var body = document.body

var scroller = {
  target: null,
  ease: 0.05, // <= scroll speed
  endX: 0,
  x: 0,
  resizeRequest: 1,
  scrollRequest: 0,
}

var requestId = null
let currentSection = 0

export const initSliderScroll = () => {
  const slider = document.querySelector(`.${appStyle.slider}`)
  window.addEventListener("wheel", e => {
    const normalized = calcScrollAmount(e)
    const scrollTo = normalized > 0 ? currentSection + 1 : currentSection - 1
    if(scrollTo >= 0 || scrollTo <= 3 ) {
      TweenMax.to(slider, {x: - scrollTo * 100 + 'vw'})
      currentSection = scrollTo
    }
  })

}

export const pxToVw = (px, invert) => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const calc = px / w
  return invert
    ? - calc
    : calc
}

export const initScroller = (target) => {
  scroller.target = target
  updateScroller()
  window.focus()
  window.addEventListener("resize", onResize)
  target.addEventListener("wheel", onScroll, { passive: true }) 
}

export function calcScrollAmount(e) {
  const { deltaX, deltaY } = e
  return deltaY ? deltaY : deltaX ? deltaX : 0
}

function applyHorizScroll(target, amount) {
  TweenMax.set(target, { x: amount })
}

export const isOverflown = ({ clientWidth, scrollWidth }) => (
  scrollWidth > clientWidth
)

export function getTranslateAmount(target) {
  const style = window.getComputedStyle(target)
  const transform = style.transform || style.webkitTransform || style.mozTransform
  const mat = transform.match(/^matrix\((.+)\)$/)
  if(!mat) return 0
  return parseFloat(mat[1].split(', ')[4])
}

function updateScroller(e, first) {
  var resized = scroller.resizeRequest > 0
  // if(e && first) {
  //   console.log(e.deltaY)
  //   if(e.deltaY > 0) {
  //     scroller.target.scrollLeft += e.deltaY
  //   } else if(e.deltaY < 0) {
  //     scroller.target.scrollLeft -= e.deltaY
  //   }
  // }
    
  if (resized) {    
    var width = scroller.target.clientWidth
    body.style.width = width + "px"
    scroller.resizeRequest = 0
  }
  var scrollX = scroller.target.scrollLeft

  scroller.endX = scrollX
  scroller.x += (scrollX - scroller.x) * scroller.ease

  const abs = Math.abs(scrollX - scroller.x)

  if (abs < 0.05 || resized) {
    scroller.x = scrollX
    scroller.scrollRequest = 0
  }

  scroller.target.childNodes.forEach(child => {
    applyHorizScroll(child, -scroller.x)
  })
  
  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(() => updateScroller(e)) : null
}

function onScroll(e) {
  scroller.scrollRequest++
  const { scrollWidth, scrollLeft, clientWidth} = scroller.target
  const amount = calcScrollAmount(e)
  console.log(scrollLeft, scrollWidth, amount)
  if((scrollLeft + clientWidth < scrollWidth && amount > 0) || (scrollLeft > 0 && amount < 0)) {
    console.log('stop propag')
    e.stopPropagation()
  } 

  if (!requestId) {
    requestId = requestAnimationFrame(() => updateScroller(e, true))
  }
}

function onResize() {
  scroller.resizeRequest++
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller)
  }
}