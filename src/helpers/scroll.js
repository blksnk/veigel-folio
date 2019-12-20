import { TweenMax, Power2 } from 'gsap'
import { checkSectionChange, underlineLinks } from 'helpers/nav.js'
import { links } from 'assets/data.js'

import s from 'App.module.css'

export const normalizeScroll = (e, history) => {
  const _slider = document.querySelector(`.${s.app}`)
  const amount = calcScrollAmount(e)
  if(e.deltaY) {
    if(_slider.scrollLeft === 0 && amount < 0) {
      return null
    }
    _slider.scrollLeft = _slider.scrollLeft + amount
    checkSectionChange(_slider.scrollLeft, history)

  }
}

export const hideTabBar = () => {
  window.scrollTo(0,1)
}

export const scrollTo = (e, index, immediate) => { //tweens slider main according to given index
  if(e) {
    e.preventDefault()
  }
  const width = document.documentElement.clientWidth
  const main = document.querySelector('main')
  if(!immediate) {
    TweenMax.to(main, 1.2, { x: - width * index, ease: Power2.easeInOut })
  } else {
    TweenMax.set(main, { x: - width * index })
  }
  underlineLinks(index)
}

export const scrollToSectionOnLoad = () => {
  const { pathname } = window.location
  const hrefs = links.map(item => item.href)
  const index = hrefs.indexOf(pathname)
  setTimeout(() => scrollTo(null, index), 500)
}

export const pxToVw = (px, invert) => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const calc = px / w
  return invert
    ? - calc
    : calc
}

export function calcScrollAmount(e) {
  const { deltaX, deltaY } = e
  return deltaY ? deltaY : deltaX ? deltaX : 0
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