import React from 'react'
import { Waypoint } from 'react-waypoint'
import g from './components.module.css'
import shareIcon from 'assets/icons/share.svg'

const combineClasses = (d, c) => {
  return c ? `${g[d]} ${c}` : g[d]
}

export const FullSection = ({ children, className, onEnter, onLeave, ...props }) => (
  <Waypoint horizontal onEnter={onEnter} onLeave={onLeave}>
    <section {...props} className={combineClasses('fullSection', className)}>
      {children}
    </section>
  </Waypoint>
)

export const HalfSection = ({ children, onEnter, onLeave, className, left, ...props }) => (
  <Waypoint horizontal onEnter={onEnter} onLeave={onLeave}>
  <section {...props} className={combineClasses(left ? 'halfSectionLeft' : 'halfSection')}>
    <div className={combineClasses('halfSectionContent', className)}>
      {children}
    </div>
  </section>
  </Waypoint>
)

export const Link = ({ className, title, href, children, img, ...props }) => (
  <a {...props} className={`${className} ${g.link} link`} title={title} href={href} target='_blank' rel='noopener noreferrer'>
  <span>{children}</span>
  {img 
    ? <img className={g.linkIcon} src={shareIcon} alt={title}/>
    : null}
  </a>
)