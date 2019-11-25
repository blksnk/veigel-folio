import React from 'react'
import g from './components.module.css'
import shareIcon from 'assets/icons/share.svg'

const combineClasses = (d, c) => {
  return c ? `${g[d]} ${c}` : g[d]
}

export const FullSection = ({ waypoint, children, className, ...props }) => (
  <section {...props} className={combineClasses('fullSection', className)}>
    {children}
  </section>
)

export const HalfSection = ({ waypoint, children, className, left, ...props }) => (
  <section {...props} className={combineClasses(left ? 'halfSectionLeft' : 'halfSection')}>
    <div className={combineClasses('halfSectionContent', className)}>
      {children}
    </div>
  </section>
)

export const Link = ({ className, title, href, children, img, ...props }) => (
  <a {...props} className={`${className} ${g.link} link`} title={title} href={href} target='_blank' rel='noopener noreferrer'>
  <span>{children}</span>
  {img 
    ? <img className={g.linkIcon} src={shareIcon} alt={title}/>
    : null}
  </a>
)