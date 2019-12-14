import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { initHovers } from 'helpers/cursor.js'
import { underlineLinks } from 'helpers/nav.js'
import { animateMenuOpen, animateMenuClose, animatePageTransition } from 'helpers/animate.js'
import { links, socials } from 'assets/data.js'
import s from 'App.module.css'

const Overlay = ({ history, isMobile }) => { //renders page overlay (nav), inits cursor hover effects. might add to the overlay as features get completed
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    if(!loaded) {
      initHovers()
      setLoaded(true)
    }
  }, [loaded, setLoaded])
  return (
    <React.Fragment>
      <RenderNavOrMenu history={history} isMobile={isMobile}/>
      {!isMobile
        ? <RenderBtmOverlay/>
        : null}
    </React.Fragment>
  )
}

const RenderNavOrMenu = ({ isMobile, history }) => {
  if(isMobile) {
    return <Menu history={history}/>
  } else {
    return <RenderTopOverlay history={history}/>
  }
}

const RenderTopOverlay = ({ history }) => {

  const changePage = (e, { href }, i) => {
    e.preventDefault()

    if(href !== history.location.pathname) {
      animatePageTransition()
      underlineLinks(i)
      setTimeout(() => {
        history.push(href)
      }, 600)
      setTimeout(() => {
        animatePageTransition(true)
      }, 800)
    }
  }
  return (
    <nav className={s.overlayTop}>
      <RenderLinks history={history} changePage={changePage} activeClass={s.activeLink}/>
    </nav>
  )
}

const Menu = ({ history, title }) => {
  const [ expanded, setExpanded ] = React.useState(false)
  const currentTitle = links[links.map(item => item.href).indexOf(history.location.pathname)]
  const changePage = (e, { href }, i) => {
    setExpanded(false)
    animateMenuClose()
  }

  const expand = () => {
    if(expanded) {
      animateMenuClose()
    } else {
      animateMenuOpen()
    }
    setExpanded(!expanded)
  }
  return (
    <React.Fragment>
      <button className={`${s.menuBtn} link hamburger hamburger--spring ${expanded ? 'is-active' : ''}`} onClick={expand}>
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>

      {title
      ? <span className={s.menuTitle}>{currentTitle}</span>
      : null}

      <nav className={`${s.menuLinks} ${expanded ? s.menuExpanded : ''}`}>
        <RenderLinks menu history={history} changePage={changePage} activeClass={s.menuLinkActive}/>
        <div className={s.menuBtm}></div>
      </nav>
    </React.Fragment>
  )
}

const RenderLinks = ({ changePage, activeClass, history, menu }) => {
  return links.map(
    (link, index) => (
      <Link
        to={link.href}
        title={link.title}
        key={'link' + index}
        className={`link ${history.location.pathname === link.href ? activeClass : ''}`}
        onClick={e => changePage(e, link, index)}
      >
        {menu ? link.menuTitle : link.title}
      </Link>
    )
  )
}

const RenderBtmOverlay = () => {
  return (
    <div className={s.overlayBtm}>
      {socials.map((item, index) => (
        <a className={`link ${s.socialLink}`} key={`overlaySocial${index}`} href={item.href} target='_blank' rel='noopener noreferrer'>{item.title}</a>
      ))}
    </div>
  )
}

export default withRouter(Overlay)