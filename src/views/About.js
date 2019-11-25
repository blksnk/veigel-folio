import React from 'react'
import s from './About.module.css'
import { alignAbout } from 'helpers/alignLayout.js'
import { FullSection } from 'components/Section.js'
import bg3 from 'assets/images/bg3.jpg'

const About = () => {
  const [ loaded, setLoaded ] = React.useState(false)
  React.useEffect(() => {
    if(!loaded) {
      setTimeout(() => alignAbout(), 100)
      setLoaded(true)
    }
  }, [ loaded ])
  return (
    <FullSection className={s.page} id='section2'>
      <div className={s.left}></div>
      <div className={s.image} style={{ backgroundImage: `url(${bg3})` }}></div>

      <div className={s.right}>
        <div className={s.textWrapper}>
          <h1>
            Hi, I'm Jean-Nicolas
          </h1>
          <p>
            I'm a freelance full stack developer based in <Emphasis>Strasbourg, France</Emphasis>.
            I like to focus on <Emphasis>modern</Emphasis> layouts, <Emphasis>creative</Emphasis> animations and <Emphasis>clean code</Emphasis> all around.
          </p>

          <p>
            I have worked with individuals and at start-ups, agencies and brands.
          <br/>
            Over the past year, I've teamed up with <Emphasis linkTo='wolfox.co'>Wolfox</Emphasis>, <Emphasis linkTo='datavalue-consulting.com'>DataValue Consulting</Emphasis>, <Emphasis linkTo='se.com'>Schneider Electric</Emphasis> and more.
          </p>

          <p>
            I speak a couple of languages fluently, namely <Emphasis>French</Emphasis>, <Emphasis>English</Emphasis> and <Emphasis>German</Emphasis>.
          </p>
          <p>
            Communication should be a non-issue.
          </p>
        </div>
      </div>
    </FullSection>
  )
}

const Emphasis = ({ children, linkTo }) => {
  if(!linkTo) {
    return <span className={s.white}>{children}</span>
  } else {
    return <a className={`${s.underline} link`} href={`https://www.${linkTo}`} target='_blank' title={`Visit ${String(children)}'s website`} rel='noopener noreferrer'>{children}</a>
  }
}

export default About