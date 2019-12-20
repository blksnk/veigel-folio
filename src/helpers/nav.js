import s from 'App.module.css'
import { links } from 'assets/data.js'
import { setCurrentSectionIndexIfNeeded, getCurrentSectionIndex } from 'App.js'

export const updateTitle = (t) => {
  document.title = `JN Veigel — ${t}`
}

export const underlineLinks = (i) => { //assigns classes for css transitions
  const linksHTML = document.querySelectorAll(`.${s.overlayTop} a`)
  linksHTML.forEach((link, index) => {
    if(index === i) {
      link.classList.add(s.activeLink)
      updateTitle(links[index].title)
    } else {
      link.classList.remove(s.activeLink)
    }
  })
}

export const changePage = (h, to) => {
  h.push(to)
}

export const checkSectionChange = (scrollLeft, history) => {
  const width = document.documentElement.clientWidth / 2
  const links = [ '/', '/work', '/info', '/contact' ]
  const sections = document.querySelectorAll('section')
  let index = null
  sections.forEach((section, i) => {
    const { offsetLeft, clientWidth } = section
    if(scrollLeft < width) {
      index = 0
    } else if(scrollLeft + width >= offsetLeft && scrollLeft + width <= clientWidth + offsetLeft) {
      index = i
    }
  })
  if(getCurrentSectionIndex() !== index) {
    underlineLinks(index)
    history.replace(links[index])
  }
  setCurrentSectionIndexIfNeeded(index)
}