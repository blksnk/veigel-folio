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

export const Logo = ({ className, fill, strokeWidth }) => (
  <div className={`${g.logo} ${className ? className : ''}`}>
    <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 91 91'>
      <defs>
        <style type='text/css'>
          {`
            ${fill ? '.cls-1-fill' : '.cls-1'} {
              fill:${fill ? '#EEE' : 'none'};
            }
            ${fill ? '.cls-1-fill, .cls-2-fill' : '.cls-1, .cls-2'} {
              stroke:${fill ? '#000' : '#EEE'};
              stroke-miterlimit:10;
              stroke-width: 2px;
            }
            ${fill ? '.cls-2-fill' : '.cls-2'} {
              fill:url(#New_Gradient_Swatch_1);
            }
          `}
        </style>
        <linearGradient id='New_Gradient_Swatch_1' x1='45.5' y1='23' x2='45.5' y2='68' gradientUnits='userSpaceOnUse'>
          <stop offset='0' stopColor='#f97c07'>
            <animate attributeName='stop-color' values='#f97c07; #7e00f5; #f97c07' dur="2s" repeatCount='indefinite'></animate>
          </stop>
          <stop offset='1' stopColor='#7e00f5'>
            <animate attributeName='stop-color' values='#7e00f5; #f97c07; #7e00f5' dur="4s" repeatCount='indefinite'></animate>
          </stop>
        </linearGradient>
      </defs>

      <title>moon {fill ? 'fill' : 'hollow'}</title>

      <g id='Layer_1-2' data-name='Layer 1'>
        <circle className={fill ? 'cls-1-fill' : 'cls-1'} cx='45.5' cy='45.5' r='45'/>
        <circle className={fill ? 'cls-1-fill' : 'cls-1'} cx='56.75' cy='45.5' r='33.75'/>
        <circle className={fill ? 'cls-2-fill' : 'cls-2'} cx='45.5' cy='45.5' r='22.5'/>
      </g>
    </svg>
  </div>
)