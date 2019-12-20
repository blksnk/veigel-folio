import React from 'react'
import { useTranslation } from 'react-i18next'
import { initHovers } from 'helpers/cursor.js'
import { animatePageEnterContact } from 'helpers/animate.js'
import { FullSection, Link, Title } from 'components/Section.js'
import { socials } from 'assets/data.js'

import s from './Contact.module.css'

const Contact = ({ isMobile }) => {
  const { t } = useTranslation('contact')
  const pageRef = React.useRef(null)
  React.useEffect(() => {
    initHovers()
    animatePageEnterContact()
  }, [])
  return (
    <FullSection ref={pageRef} className={s.page} id='section3'>
      <Title className={s.t1}>{t("Let's make")}</Title>
      <Title className={s.t2}>{t("Something")}</Title>
      <Title className={s.unique}>{t("Unique")}</Title>


        
      <div className={s.emailWrapper}>
        <p className={s.p}>
          {t("Got a project")}
        </p>
        <p className={s.em}>{t("Send me an email")}</p>
        <Link className={s.email} img title='send me an email' href='mailto:hello@veigel.dev'>hello@veigel.dev</Link>
      </div>

      <Socials isMobile={isMobile}/>

    </FullSection>
  )
}

const Socials = ({ isMobile }) => {
  const { t } = useTranslation('contact')
  return (
    <div className={s.socials}>
      <p className={s.p}>{t("Feel free to reach")}</p>

      {isMobile
        ? socials.map((item, index) => (
            <Link key={`contactSocials${index}`} img className={s.social} {...item}>{item.title}</Link>
          ))
        : null}
    </div>
)}


export default Contact