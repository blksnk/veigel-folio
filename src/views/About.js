import React from 'react'
import s from './About.module.css'
import { initHovers } from 'helpers/cursor.js'
import { changePage } from 'helpers/nav.js'
import { animatePageEnterAbout } from 'helpers/animate.js'
import { ScrollBar } from 'components/ScrollIndicator.js'
import { FullSection, Link } from 'components/Section.js'
import { clients, skills } from 'assets/data.js'

const About = ({ isMobile, history }) => {
  const pageRef = React.useRef(null)
  React.useEffect(() => {
      initHovers()
      animatePageEnterAbout()
  }, [])

  return (
    <FullSection className={s.page} ref={pageRef} id='section2'>
      <div className={s.left}>
        <div className={s.textSection}>
          <Title/>
          <Text history={history}/>
          <Freelance changePage={changePage} history={history}/>
        </div>
        <div className={s.infoSection}>
          <Clients/>
          <Skills/>
        </div>
      </div>

      <ScrollBar className={s.aboutScroll} parent={pageRef.current}/>

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

const Title = () => (
  <h1 className={s.title}>get to know me</h1>
)

const Text = ({ history }) => (
  <div className={s.textWrapper}>
    <p className={s.white}>
      My name is Jean-Nicolas Veigel.
    </p>
    <p>
      I'm a french full stack web developer based in Strasbourg.
      I like to focus on <Emphasis>modern</Emphasis> layouts, <Emphasis>creative</Emphasis> animations and clean code all around.
    </p>

    <p>
      Over the past year, I have worked and teamed up with individuals, start-ups and agencies.
    </p>

    <p>
      I speak a couple of languages fluently, namely <Emphasis>French</Emphasis>, <Emphasis>English</Emphasis> and <Emphasis>German</Emphasis>.
      Communication should be a non-issue.
    </p>
  </div>
)

const Freelance = ({ changePage, history }) => (
 <div className={s.freelance}>
    <Emphasis>
      Available for freelance work&mdash; <span className={s.primary}>January 2020</span>
    </Emphasis>

    <Link className={s.contactLink} img title='get in touch' href='mailto:hello@veigel.dev'>Get in touch</Link>
  </div>
)

const Clients = () => (
  <div className={`${s.info} ${s.clients}`}>
    <h3>Clients&mdash;</h3>
    <ul>
      {clients.map((item, index) => <li key={`client${index}`}><Emphasis linkTo='https://www.google.fr'>{item}</Emphasis></li>)}
    </ul>
  </div>
)

const Skills = () => (
  <div className={`${s.info} ${s.skills}`}>
    <h3>Skills&mdash;</h3>
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