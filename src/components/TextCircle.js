import React from 'react'
import g from './components.module.css'

const combineClasses = (def, custom) => {
  return `${def} ${custom ? custom : ''}`
}

const TextCircle = ({ children, color, className, ...props }) => {
  const namespaces = {
    "xlinkHref": "#circlePath"
  }
  return (
  <div className={combineClasses(g.textCircle, className)}>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300">
      <defs>
        <path id="circlePath" d=" M 150, 150 m -120, 0 a 120,120 0 0,1 240,0 a 120,120 0 0,1 -240,0 "/>
      </defs>
      <g>
        <use {...namespaces} fill="none"/>
        <text fill={color || '#FFF'}>
            <textPath {...namespaces}>{children}</textPath>
        </text>
      </g>
    </svg>
  </div>
)}

export default TextCircle