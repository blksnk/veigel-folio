import React, { Fragment } from 'react'
import { Logo } from 'components/Section.js'
import g from './components.module.css'

export const PageTransition = () => (
  <Fragment>
    <div className={g.transition1}></div>
    <div className={g.transition2}>
      <Logo className={g.transitionLogo}/>
    </div>
  </Fragment>
)