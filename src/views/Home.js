import React from 'react'
import { withRouter } from 'react-router-dom'
import { HalfSection, Link } from 'components/Section.js'
import { scrollTo } from 'helpers/scroll.js'
import s from './Home.module.css'

const Home = ({ history }) => {
  return (
    <HalfSection className={s.page} id='section0'>
      <Title/>
      <p className={s.text}>
        Hi, my name's Jean-Nicolas Veigel. <br/> I have been making websites and apps for about a year. <br/> This is my personal portfolio.
      </p>
      <Link
        img
        onClick={() => {
          scrollTo(null, 1)
          history.replace('/work')
        }}
        className={`${s.workBtn} link`}
      >View recent work</Link>
    </HalfSection>
  )
}

const Title = () => (
  <h1 className={s.title}>
    <span id={s.titleStart}>freelance</span>
    <span id={s.titleMiddle}>full stack</span>
    <span id={s.titleEnd}>web developer</span>
  </h1>
)

export default withRouter(Home)