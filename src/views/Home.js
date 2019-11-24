import React from 'react'
import { HalfSection, Link } from 'components/Section.js'
import s from './Home.module.css'

const Home = ({ scrollTo, underlineLinks, history }) => {
  return (
    <HalfSection onEnter={() => underlineLinks(0)} onLeave={() => underlineLinks(1)} className={s.page} id='section0'>
      <Title/>
      <p className={s.text}>Consectetur dolor sint amet incididunt ea magna id excepteur laborum eu dolor ex minim ea anim non deserunt culpa labore mollit amet.</p>
      <Link
        img
        onClick={() => {
          scrollTo(null, 1)
          history.replace('/work')
        }}
        className={`${s.workBtn} link`}
      >See recent work.</Link>
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

export default Home