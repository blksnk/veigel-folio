import paper from 'paper'
import { TweenMax } from 'gsap'

let clientX = -100
let clientY = -100

let lastX = 0
let lastY = 0
let isStuck = false
let group, stuckX, stuckY

const average = (a, b) => (a + b) / 2

export const initCursor = () => {
  const innerCursor = document.querySelector(".cursor-inner")
  document.addEventListener("mousemove", e => {
    clientX = e.clientX
    clientY = e.clientY
  }, { passive: true })

  const render = () => {
    TweenMax.set(innerCursor, {
      x: clientX,
      y: clientY
    });
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

export const initCanvas = () => {
  const canvas = document.querySelector(".cursor-outer")
  const shapeBounds = {
    width: 75,
    height: 75
  }
  paper.setup(canvas)
  const strokeColor = "#CCC"
  const strokeWidth = 2
  const segments = 8
  const radius = 20
  
  // the base shape for the circle
  const polygon = new paper.Path.RegularPolygon(
    new paper.Point(0, 0),
    segments,
    radius
  )
  polygon.strokeColor = strokeColor
  polygon.strokeWidth = strokeWidth
  polygon.smooth()
  group = new paper.Group([polygon])
  group.applyMatrix = false
  
  const lerp = (a, b, n) => {
    return (1 - n) * a + n * b
  }
  
  paper.view.onFrame = e => {
    if (!isStuck) {
      // move circle around normally
      lastX = lerp(lastX, clientX, 0.15);
      lastY = lerp(lastY, clientY, 0.15);
      group.position = new paper.Point(lastX, lastY);
    } else if (isStuck) {
      // fixed position on a nav item
      lastX = lerp(lastX, average(stuckX, clientX), 0.2);
      lastY = lerp(lastY, average(stuckY, clientY), 0.2);
      group.position = new paper.Point(lastX, lastY);
    }

    if (isStuck && polygon.bounds.width < shapeBounds.width) { 
    // scale up the shape 
      polygon.scale(1.12)
    } else if (!isStuck && polygon.bounds.width > 40) {
      // scale down the shape
      polygon.scale(.95)
    } else {
      polygon.scale(1)
    }

  }
}

export const initHovers = () => {
  const handleMouseEnter = e => {
    const navItem = e.currentTarget
    const navItemBox = navItem.getBoundingClientRect()
    if(navItem.classList.contains('hover-end')) {
      stuckX = Math.round(navItemBox.left + navItemBox.width)
    } else if(navItem.classList.contains('hover-start')) {
      stuckX = Math.round(navItemBox.left + navItemBox.width * .25)
    } else if(navItem.classList.contains('hover-free')) {
      stuckX = Math.round(e.clientX)
    } else {
      stuckX = Math.round(navItemBox.left + navItemBox.width / 2)
    }
    stuckY = Math.round(navItemBox.top + navItemBox.height / 2)
    isStuck = true
  }

  const handleMouseLeave = () => {
    isStuck = false
  }

  const linkItems = document.querySelectorAll(".link")
  linkItems.forEach(item => {
    item.removeEventListener("mouseenter", handleMouseEnter)
    item.removeEventListener("mouseleave", handleMouseLeave)
    item.addEventListener("mouseenter", handleMouseEnter)
    item.addEventListener("mouseleave", handleMouseLeave)
  })
}

export const isTouch = () => {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  const mq = query => window.matchMedia(query).matches
  
  if (('ontouchstart' in window) || window.DocumentTouch) {
    return true
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}
