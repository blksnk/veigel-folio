import appStyle from 'App.module.css'
import workStyle from 'views/Work.module.css'
import aboutStyle from 'views/About.module.css'
import contactStyle from 'views/Contact.module.css'
import componentStyle from 'components/components.module.css'

import { TweenMax, Power2 } from 'gsap'

export const getVw = () => document.documentElement.clientWidth
export const getVh = () => document.documentElement.clientHeight
export const getRem = () => parseFloat(window.getComputedStyle(document.documentElement).fontSize)
export const formatClass = c => `.${c}`
export const selectClass = (c, target, multi) => (
  target
    ?  multi 
      ? target.querySelectorAll(formatClass(c))
      : target.querySelector(formatClass(c))
    : multi
      ? document.querySelectorAll(formatClass(c))
      : document.querySelector(formatClass(c))
)

export const revealOpacity = (el, d) => TweenMax.fromTo(el, d, { opacity: 0 }, { opacity:1 })
export const revealDirection = (el, d, horiz, ease) => {
  const useEase = ease ? ease : Power2.easeInOut
  return (
    horiz
      ? TweenMax.fromTo(el, d, { x: '-100vw', ease: useEase }, { x: 0 })
      : TweenMax.fromTo(el, d, { y: '100vh', ease: useEase }, { y: 0 })
  )
}

export const revealEnter = (el, d) => {
  revealDirection(el, d)
  return revealOpacity(el, d)
}

export const animateWorkOpen = (isMobile) => {
  const left = selectClass(workStyle.left)
  const project = selectClass(workStyle.project)
  const spin = selectClass(workStyle.circleContainer)
  const btn = selectClass(workStyle.closeBtn)
  const banner = selectClass(workStyle.pBannerActive, project)
  const title = selectClass(workStyle.projectPageProjectTitle, project)
  const link = selectClass(workStyle.pLink, project)
  spin.style.zIndex = 21
  project.scrollTop = 0
  if(left) {
    TweenMax.to(left, .8, { x: '100vw', ease: Power2.eastInOut })
  }
  const spinDistance = isMobile ? - getVh() + 9*getRem() + 150 : - getVh() + 12*getRem() + 300
  TweenMax.to(project, .8, { x: '100vw', ease: Power2.eastInOut })
  TweenMax.to(spin, 1, { y: spinDistance , x: isMobile ? -1*getRem() : -2*getRem(), ease: Power2.eastInOut })
  TweenMax.fromTo(btn, 1.2, { opacity: 0, y: 0 }, { opacity: 1, y: 4*getRem(), ease: Power2.easeOut }).delay(4)
  revealDirection(title, .6, true, Power2.easeOut)
  revealDirection(link, 1, true, Power2.easeOut).delay(1.2)
  revealEnter(banner, 1).delay(1.2)
}

export const animateWorkClose = (isMobile) => {
  const left = selectClass(workStyle.left)
  const project = selectClass(workStyle.project)
  const spin = selectClass(workStyle.circleContainer)
  const btn = selectClass(workStyle.closeBtn)
  spin.style.zIndex = 14
  if(left) {
    TweenMax.to(left, .6, { x: 0, ease: Power2.eastIn })
  }
  TweenMax.to(project, .6, { x: 0, ease: Power2.eastIn })
  TweenMax.to(spin, .6, { y: 0, x: 0, ease: Power2.eastIn })
  TweenMax.to(btn, .6, { y: 0, opacity: 0, ease: Power2.eastIn})
}

// menu

export const animateMenuOpen = () => {
  const linkWrapper = selectClass(appStyle.menuLinks)
  const links = linkWrapper.querySelectorAll('a')
  TweenMax.fromTo(linkWrapper, .6, { y: 0, ease: Power2.easeInOut }, { y: '100vh' })

  links.forEach((item, index) => {
    TweenMax.fromTo(item, .7 + index * .2, { y: '100vh' , ease: Power2.easeOut }, { y: 0 })
  })
}

export const animateMenuClose = () => {
  const linkWrapper = selectClass(appStyle.menuLinks)
  TweenMax.to(linkWrapper, .6, { y: 0, ease: Power2.easeIn })
}

// page enter

export const animatePageEnterWork = () => {
  const projectTitles = selectClass(workStyle.projectTitle, false, true)
  const spin = selectClass(workStyle.circleContainer)
  projectTitles.forEach((item, index) => {
    revealEnter(item, .8 + index * .2)
  })
  TweenMax.to(spin, .8, { y: 0, x: 0, ease: Power2.eastOut})
}

export const animatePageEnterAbout = () => {
  const info = selectClass(aboutStyle.infoSection)
  const text = selectClass(aboutStyle.textSection)
  const title = selectClass(aboutStyle.title, text)
  const paragraph = selectClass(aboutStyle.textWrapper, text)
  const freelance = selectClass(aboutStyle.freelance, text)
  const clients = selectClass(aboutStyle.clients, info)
  const skills = selectClass(aboutStyle.skills, info)
  
  revealEnter(title, .6)
  revealEnter(paragraph, .8)
  revealEnter(freelance, 1)
  revealEnter(clients, 1.2)
  revealEnter(skills, 1.4)
}

export const animatePageEnterContact = () => {
  const page = selectClass(contactStyle.page)
  const t1 = selectClass(contactStyle.t1, page)
  const t2 = selectClass(contactStyle.t2, page)
  const unique = selectClass(contactStyle.unique.split(' ')[1])
  const email = selectClass(contactStyle.emailWrapper, page)
  const socials = selectClass(contactStyle.socials, page)
  
  revealEnter(t1, .6)
  revealEnter(t2, .8)
  revealEnter(unique, 1)
  revealEnter(email, 1.2)
  revealEnter(socials, 1.4)
}

// page transition

export const animatePageTransition = (finish) => {
  const tr1 = selectClass(componentStyle.transition1.split(' ')[0])
  const tr2 = selectClass(componentStyle.transition2)
  if(!finish) {
    TweenMax.fromTo(tr1, .55, { y: 0, ease: Power2.easeInOut }, { y: '-100vh' })
    TweenMax.fromTo(tr2, .6, { y: 0, ease: Power2.easeInOut }, { y: '-100vh' })
  } else {
    TweenMax.fromTo(tr1, .6, { y: '-100vh', ease: Power2.easeIn }, { y: '-200vh' })
    TweenMax.fromTo(tr2, .55, { y: '-100vh', ease: Power2.easeIn }, { y: '-200vh' })
  }
}


// site enter

export const animateSiteEnter = () => {
  const splash = document.getElementById('splash')
  const splashGradient = document.getElementById('splashBack')
  const splashText = document.getElementById('splashText')
  splashGradient.classList.add('splashBackGradient')
  TweenMax.set(splashText, { innerHTML: 'jn veigel', delay: 1 })
  TweenMax.set(splashText, { innerHTML: 'web developer', color: 'transparent', delay: 2 })
  TweenMax.fromTo(splash, .55, { y: 0 }, { y: '-100vh', ease: Power2.easeInOut, delay: 3 })
  TweenMax.fromTo(splashGradient, .6, { y: 0 }, { y: '-100vh', ease: Power2.easeInOut, delay: 3 })

  setTimeout(animateFirstPage, 3000)
  setTimeout(() => {
    splash.remove()
    splashGradient.remove()
  }, 5000)

}

const animateFirstPage = () => {
  switch(window.location.pathname) {
    case '/contact':
      animatePageEnterContact()
      break;
    case '/about':
      animatePageEnterAbout()
      break;
    default:
      animatePageEnterWork()
  }
}