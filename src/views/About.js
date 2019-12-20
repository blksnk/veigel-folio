import React from 'react'
import { useTranslation } from 'react-i18next'
import s from './About.module.css'
import { initHovers } from 'helpers/cursor.js'
import { changePage } from 'helpers/nav.js'
import { animatePageEnterAbout } from 'helpers/animate.js'
import { FullSection, Link } from 'components/Section.js'
import { clients, skills, availableDate } from 'assets/data.js'

const About = ({ isMobile, history }) => {
  const pageRef = React.useRef(null)
  const { t } = useTranslation('about')
  React.useEffect(() => {
      initHovers()
      animatePageEnterAbout()
  }, [])

  return (
    <FullSection className={s.page} ref={pageRef} id='section2'>
      <div className={s.left}>
        <div className={s.textSection}>
          <Title t={t}/>
          <Text history={history}/>
          <Freelance t={t} changePage={changePage} history={history}/>
        </div>
        <div className={s.infoSection}>
          <Clients t={t}/>
          <Skills t={t}/>
        </div>
      </div>

      {!isMobile
        ? <Right/>
        : null}
    </FullSection>
  )
}

const Right = () => (
  <aside className={s.right}>
    <h2>
      FRONTEND <br/>
      & BACKEND <br/>
      WEB <br/>
      DEVELOPER
    </h2>
  </aside>
)

const Title = ({ t }) => (
  <h1 className={s.title}>{t('Get to know me')}</h1>
)

const Text = ({ history }) => {
  const { t } = useTranslation('about')
  return (
  <div className={s.textWrapper}>
    <p className={s.white}>
      {t('My name is')}
    </p>
    <p>
      {t("I'm a french")} {t("I like to focus")} <Emphasis>{t('clean code')}</Emphasis>.
    </p>

    <p>
      {t("Over the past year")}
    </p>

    <p>
      {t('I speak a couple of languages fluently, namely ')}<Emphasis>{t('French')}</Emphasis>, <Emphasis>{t('English')}</Emphasis> {t('and')} <Emphasis>{t('German')}</Emphasis>. <br/>
      {t('Communication')}
    </p>
  </div>
)}

const Freelance = ({ changePage, history, t }) => (
 <div className={s.freelance}>
    <Emphasis>
      {t('Available for freelance work')}&mdash; <span className={s.primary}>{t(availableDate)}</span>
    </Emphasis>

    <Link className={s.contactLink} img title='get in touch' href='mailto:hello@veigel.dev'>{t("Get in touch")}</Link>
  </div>
)

const Clients = ({ t }) => (
  <div className={`${s.info} ${s.clients}`}>
    <h3>{t('Clients')}&mdash;</h3>
    <ul>
      {clients.map((item, index) => <li key={`client${index}`}><Emphasis linkTo={item.href}>{item.title}</Emphasis></li>)}
    </ul>
  </div>
)

const Skills = ({ t }) => (
  <div className={`${s.info} ${s.skills}`}>
    <h3>{t('Skills')}&mdash;</h3>
    <ul>
      {skills.map((item, index) => <li key={`skill${index}`}>{item}</li>)}
    </ul>
  </div>
)

const Emphasis = ({ children, linkTo, className }) => {
  if(!linkTo) {
    return <span className={`${s.white} ${className ? className : ''}`}>{children}</span>
  } else {
    return <Link img className={`${s.underline} ${className ? className : ''} link`} href={`https://www.${linkTo}`} target='_blank' title={`Visit ${String(children)}'s website`} rel='noopener noreferrer'>{children}</Link>
  }
}

export default About