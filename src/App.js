import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'

import Work from 'views/Work.js'
import About from 'views/About.js'
import Contact from 'views/Contact.js'

import { hideTabBar } from 'helpers/scroll.js'
import { isTouch } from 'helpers/cursor.js'
import Cursor from 'components/Cursor.js'
import Overlay from 'components/Overlay.js'
import { PageTransition } from 'components/Transition.js'

import 'stylesheets/fonts.css'
import 'stylesheets/root.css'
import 'stylesheets/hamburgers.css'
import 'stylesheets/animation.css'
import s from './App.module.css'

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

export 

const App = ({ history }) => { //main app component
  const [ isMobile, setIsMobile ] = React.useState(false)

  React.useEffect(() => {
    const checkWidth = () => {
      const width = document.documentElement.clientWidth
      if(width <= 700) {
        setIsMobile(true)
        return true
      } else {
        setIsMobile(false)
        return false
      }
    }

    window.addEventListener('resize', e => {
      checkWidth()
    })

  }, [])

  React.useEffect(() => {
    if(!isMobile) {
      if(isTouch()) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

  }, [ isMobile ])

  return (
    <div className={s.app} style={{ cursor: isMobile ? 'unset' : 'none' }}>
      <Nav isMobile={isMobile}/>
      
      <Overlay isMobile={isMobile}/>
      {!isMobile
        ? <Cursor/>
        : null}

     <PageTransition/>
    </div>
  )
}

const Nav = ({ isMobile }) => (
  <main className={s.switch}>
   <Switch>
     <Route path='/about' render={(props) => <About {...props} isMobile={isMobile}/>}/>
     <Route path='/contact' render={(props) => <Contact {...props} isMobile={isMobile}/>}/>
     <Route path='/' render={(props) => <Work {...props} isMobile={isMobile}/>}/>
   </Switch>
  </main>
)

export default withRouter(App)