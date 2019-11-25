import s from 'App.module.css'
import { setCurrentSectionIndexIfNeeded, getCurrentSectionIndex } from 'App.js'

export const updateTitle = (t) => {
  document.title = `${t.split('.')[0]} — Jean-Nicolas Veigel`
}

export const underlineLinks = (i) => { //assigns classes for css transitions
  const links = document.querySelectorAll(`.${s.overlayTop} a`)
  links.forEach((link, index) => {
    if(index === i) {
      link.classList.add(s.activeLink)
      updateTitle(link.innerHTML)
    } else {
      link.classList.remove(s.activeLink)
    }
  })
}

export const checkSectionChange = (scrollLeft) => {
  const width = document.documentElement.clientWidth / 2
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
  }
  setCurrentSectionIndexIfNeeded(index)
}