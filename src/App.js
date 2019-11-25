import React from 'react'
import { withRouter } from 'react-router-dom'

import Home from 'views/Home.js'
import Work from 'views/Work.js'
import About from 'views/About.js'
import Contact from 'views/Contact.js'

import { alignLayout } from 'helpers/alignLayout.js'
import { normalizeScroll, scrollTo, scrollToSectionOnLoad } from 'helpers/scroll.js'
import { ScrollBar } from 'components/ScrollIndicator.js'
import Cursor from 'components/Cursor.js'
import Overlay from 'components/Overlay.js'

import 'stylesheets/fonts.css'
import 'stylesheets/root.css'
import s from './App.module.css'

import bg2 from 'assets/images/bg2.jpg'
import bg1 from 'assets/images/bg1.jpg'

let currentSectionIndex = 0

export const getCurrentSectionIndex = () => currentSectionIndex

export const setCurrentSectionIndex = i => {
  currentSectionIndex = i
}

export const setCurrentSectionIndexIfNeeded = i => {
  if(getCurrentSectionIndex() !== i) {
    setCurrentSectionIndex(i)
  }
}

const App = ({ history }) => { //main app component
  const [ loaded, setLoaded ] = React.useState(false)
  const [ ref, setRef ] = React.useState(null)

  React.useEffect(() => { //calls alignLayout() once and sets up resize events to call it again if needed
    const slider = document.querySelector(`.${s.slider}`)
    if(!loaded) {
      slider.addEventListener('wheel', normalizeScroll)
      window.addEventListener('resize', () => setTimeout(() => {
        scrollTo(null, currentSectionIndex, true)
        alignLayout()
      }, 50))
      scrollToSectionOnLoad()
      setLoaded(true)
    }
  }, [ loaded ])

  return (
    <div className={s.app} ref={div => setRef(div)}>
      <BackgroundImage/>

      <main className={s.slider}>
        <Home/>
        <Work/>
        <About/>
        <Contact/>
      </main>
      <Overlay/>
      <ScrollBar parent={ref}/>
      <Cursor/>
    </div>
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

export default withRouter(App)