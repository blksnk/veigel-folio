import React from 'react'
import { withRouter } from 'react-router-dom'
import { initHovers } from 'helpers/cursor.js'
import { scrollTo } from 'helpers/scroll.js'
import s from 'App.module.css'

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

const Overlay = ({ history }) => { //renders page overlay (nav), inits cursor hover effects. might add to the overlay as features get completed
  const [loaded, setLoaded] = React.useState(false)
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

      <RenderBtmOverlay/>
    </React.Fragment>
  )
}

const RenderBtmOverlay = () => {
  return (
    <div className={s.overlayBtm}>
      <a className={`link ${s.socialLink}`} href="https://www.linkedin.com/in/jn-veigel" target='_blank' rel='noopener noreferrer'>LinkedIn</a>
      <a className={`link ${s.socialLink}`} href="https://www.github.com/blksnk" target='_blank' rel='noopener noreferrer'>Github</a>
      <a className={`link ${s.socialLink}`} href="https://www.gitlab.com/blksnk" target='_blank' rel='noopener noreferrer'>Gitlab</a>
      <a className={`link ${s.socialLink}`} href="https://www.instagram.com/chxmpetre" target='_blank' rel='noopener noreferrer'>Instagram</a>
    </div>
  )
}

export default withRouter(Overlay)