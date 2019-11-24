import React from 'react'
import s from './About.module.css'
import { alignAbout } from 'helpers/alignLayout.js'
import { FullSection } from 'components/Section.js'
import bg3 from 'assets/images/bg3.jpg'

const About = ({ underlineLinks }) => {
  React.useEffect(() => {
    alignAbout()
  })
  return (
    <FullSection className={s.page} id='section2' onEnter={() => underlineLinks(2)}>
      <div className={s.left}></div>
      <div className={s.image} style={{ backgroundImage: `url(${bg3})` }}></div>

      <div className={s.right}>
        <div className={s.textWrapper}>
          <h1>
            Hi, I'm Jean-Nicolas
          </h1>
          <p>
            I'm a freelance full stack developer based in <Underline>Strasbourg, France</Underline>.
            I like to focus on <Underline>modern</Underline> layouts, <Underline>creative</Underline> animations and <Underline>clean code</Underline> all around.
          </p>

          <p>
            I have worked with individuals and at start-ups, agencies and brands.
          <br/>
            Over the past year, I've teamed up with <Underline linkTo='wolfox.co'>Wolfox</Underline>, <Underline>DataValue Consulting</Underline>, <Underline>Schneider Electric</Underline> and more.
          </p>

          <p>
            I speak a couple of languages fluently, namely: French, English and German.
            <br/>
            Communication should be a non-issue.
          </p>
        </div>
      </div>
    </FullSection>
  )
}

const Underline = ({ children, linkTo }) => {
  if(!linkTo) {
    return <span className={s.underline}>{children}</span>
  } else {
    return <a className={`${s.underline} link`} href={`https://www.${linkTo}`} target='_blank' title={`Visit ${String(children)}'s website`} rel='noopener noreferrer'>{children}</a>
  }
}

export default About