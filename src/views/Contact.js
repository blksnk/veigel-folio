import React from 'react'
import { initHovers } from 'helpers/cursor.js'
import { animatePageEnterContact } from 'helpers/animate.js'
import { FullSection, Link, Title } from 'components/Section.js'
import { socials } from 'assets/data.js'
import { ScrollBar } from 'components/ScrollIndicator'

import s from './Contact.module.css'

const Contact = ({ isMobile }) => {
  const pageRef = React.useRef(null)
  React.useEffect(() => {
    initHovers()
    animatePageEnterContact()
  }, [])
  return (
    <FullSection ref={pageRef} className={s.page} id='section3'>
      <Title className={s.t1}>let's make</Title>
      <Title className={s.t2}>something</Title>
      <Title className={s.unique}>unique</Title>

        
      <div className={s.emailWrapper}>
        <p className={s.p}>
          Got a project ? Need some information ? I'd love to hear from you. <br/>
        </p>
        <p className={s.em}>Send me an email below.</p>
        <Link className={s.email} img title='send me an email' href='mailto:hello@veigel.dev'>hello@veigel.dev</Link>
      </div>

      <Socials isMobile={isMobile}/>

      <ScrollBar className={s.scrollBar} parent={pageRef.current}/>

    </FullSection>
  )
}

const Socials = ({ isMobile }) => {
  return (
    <div className={s.socials}>
      <p className={s.p}>Feel free to reach me via my socials.</p>

      {isMobile
        ? socials.map((item, index) => (
            <Link key={`contactSocials${index}`} img className={s.social} {...item}>{item.title}</Link>
          ))
        : <p className={s.em}>Right there, in the bottom right corner.</p>}
    </div>
)}


export default Contact