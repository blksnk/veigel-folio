import React from 'react'
import { withRouter } from 'react-router-dom'
import { TweenMax, Power2 } from 'gsap'

import Home from 'views/Home.js'
import Work from 'views/Work.js'
import About from 'views/About.js'
import Contact from 'views/Contact.js'

import { alignLayout } from 'helpers/alignLayout.js'
import { updateTitle } from 'helpers/nav.js'
import { initCanvas, initCursor, initHovers } from 'helpers/cursor.js'
import { calcScrollAmount } from 'helpers/scroll.js'
import { ScrollBar } from 'components/ScrollIndicator.js'

import 'stylesheets/fonts.css'
import 'stylesheets/root.css'
import s from './App.module.css'

import bg2 from 'assets/images/bg2.jpg'
import bg1 from 'assets/images/bg1.jpg'

const underlineLinks = (i) => { //assigns classes for css transitions
  console.log('underlineLinks', i)
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

const App = ({ history }) => { //main app component
  const [ loaded, setLoaded ] = React.useState(false)
  const [ ref, setRef ] = React.useState(null)

  const scrollTo = (e, index) => { //tweens slider main according to given index
    if(e) {
      e.preventDefault()
    }
    document.querySelector(`#section${index}`).scrollIntoView({ behavior: 'smooth', inline: 'start' })
    underlineLinks(index)
  }

  React.useEffect(() => { //calls alignLayout() once and sets up resize events to call it again if needed
    const slider = document.querySelector(`.${s.slider}`)
    const scrollToSectionOnLoad = () => {
      const { pathname } = window.location
      const links = [ '/', '/work', '/info', '/contact' ]
      const index = links.indexOf(pathname)
      setTimeout(() => scrollTo(null, index), 500)
    }

    const normalizeScroll = (e) => {
      // e.preventDefault()
      const _slider = document.querySelector(`.${s.app}`)
      const amount = calcScrollAmount(e)
      if(e.deltaY) {
        // _slider.style.scrollSnapType = null
        // _slider.scrollLeft = _slider.scrollLeft + amount
        TweenMax.set(_slider, {scrollLeft: _slider.scrollLeft + amount * 3})
      }
      console.log('scrolleft', _slider.scrollLeft, 'amount', amount)
    }

    if(!loaded) {
      // slider.addEventListener('wheel', normalizeScroll)
      window.addEventListener('resize', alignLayout)
      scrollToSectionOnLoad()
      setLoaded(true)
    }
  }, [ loaded ])

  return (
    <div className={s.app} ref={div => setRef(div)}>
      <BackgroundImage/>

      <main className={s.slider}>
        <Home scrollTo={scrollTo} history={history} underlineLinks={underlineLinks}/>
        <Work underlineLinks={underlineLinks}/>
        <About underlineLinks={underlineLinks}/>
        <Contact underlineLinks={underlineLinks}/>
      </main>
      <Overlay scrollTo={scrollTo} history={history}/>
      <ScrollBar parent={ref}/>
      <Cursor/>
    </div>
  )
}

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

const BackgroundImage = ({ currentPageIndex }) => { //literally 2 images side by side, might do something fancier later on
  return (
    <div className={s.background}>
      <div className={s.backgroundImage} style={{backgroundImage: `url(${bg1})`}}></div>
      <div className={s.backgroundImage} style={{backgroundImage: `url(${bg2})`}}></div>
    </div>
  )
}

const Overlay = ({ scrollTo, history }) => { //renders page overlay (nav), inits cursor hover effects. might add to the overlay as features get completed
  const [loaded, setLoaded] = React.useState(false)
  const links = [{
    href: '/',
    title: 'Home'
  }, {
    href: '/work',
    title: 'Work'
  }, {
    href: '/info',
    title: 'Information'
  }, {
    href: '/contact',
    title: 'Contact'
  }]
  React.useEffect(() => {
    if(!loaded) {
      initHovers()
      setLoaded(true)
    }
  }, [loaded, setLoaded])
  return (
    <React.Fragment>
      <nav className={s.overlayTop}>
        {links.map((link, index) => (
          <a
            {...link}
            key={'link' + index}
            className='link'
            onClick={e => {
              scrollTo(e, index)
              history.replace(link.href)
            }}
          >
            {link.title}.
          </a>
        ))}
      </nav>

      <span className={s.overlayTitle}>
        Veigel.dev &mdash; 2019
      </span>

    {/*socials overlay bottom*/}
    </React.Fragment>
  )
}

const RenderBtmOverlay = ({ pageIndex }) => {

}

export default withRouter(App)
