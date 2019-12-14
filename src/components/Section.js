import React from 'react'
import g from './components.module.css'
import shareIcon from 'assets/icons/share.svg'

const combineClasses = (d, c) => {
  return c ? `${g[d]} ${c}` : g[d]
}

export const FullSection = React.forwardRef(({ waypoint, children, className, ...props }, ref) => (
  <section {...props} ref={ref} className={combineClasses('fullSection', className)}>
    {children}
  </section>
))

export const HalfSection = ({ waypoint, children, className, left, ...props }) => (
  <section {...props} className={combineClasses(left ? 'halfSectionLeft' : 'halfSection')}>
    <div className={combineClasses('halfSectionContent', className)}>
      {children}
    </div>
  </section>
)

export const Link = ({ onClick, className, title, href, children, img, ...props }) => (
  <a {...props} onClick={onClick ? onClick : undefined} className={`${className ? className : ''} ${g.link} link`} title={title} href={href} target='_blank' rel='noopener noreferrer'>
  <span>{children}</span>
  {img 
    ? <img className={g.linkIcon} src={shareIcon} alt={title}/>
    : null}
  </a>
)

export const Title = React.forwardRef(({ className, children, fill, ...props }, ref) => {
  const cl = `${g.title} ${fill ? g.titleFill : ''} ${className ? className : ''}`
  return (
    <h1 className={cl} ref={ref} {...props}>{children}</h1>
  )
})

export const Logo = ({ className }) => (
  <div className={`${g.logo} ${className ? className : ''}`}>
    <span className={g.logoV}>V</span>
    <div className={g.logoLine}></div>
    <span className={g.logoD}>D</span>
  </div>
)