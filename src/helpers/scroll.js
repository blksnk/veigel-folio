import { setCurrentSectionIndex } from 'App.js'
import { checkSectionChange, underlineLinks } from 'helpers/nav.js'

import s from 'App.module.css'

export const normalizeScroll = (e) => {
  const _slider = document.querySelector(`.${s.app}`)
  const amount = calcScrollAmount(e)
  if(e.deltaY) {
    if(_slider.scrollLeft === 0 && amount < 0) {
      return null
    }
    _slider.scrollLeft = _slider.scrollLeft + amount
    checkSectionChange(_slider.scrollLeft)

  }
}

export const scrollTo = (e, index, immediate) => { //tweens slider main according to given index
  if(e) {
    e.preventDefault()
  }
  document.querySelector(`#section${index}`).scrollIntoView({ behavior: immediate ? 'instant' : 'smooth', inline: 'start', block: 'start' })
  underlineLinks(index)
  setCurrentSectionIndex(index)
}

export const scrollToSectionOnLoad = () => {
  const { pathname } = window.location
  const links = [ '/', '/work', '/info', '/contact' ]
  const index = links.indexOf(pathname)
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