import React from 'react'
import { HalfSection, Link } from 'components/Section.js'
import s from './Contact.module.css'

const Contact = ({ underlineLinks }) => {
  return (
    <HalfSection onEnter={() => underlineLinks(3)} onLeave={() => underlineLinks(2)} className={s.page} left  id='section3'>
      <p className={s.text}>
        For professional opportunities, general information or just to send me jokes, please get in touch at the email below.
      </p>
      <Link className={s.email} img title='send me an email' href='mailto:hello@veigel.dev'>hello@veigel.dev</Link>
      {/*<Credit/>*/}
    </HalfSection>
  )
}

const Credit = () => (
  <span className={s.credit}>
    Photos by <Link className={s.creditLink} title="Visit Paweł's profile on Unsplash" href="https://unsplash.com/@pawel_czerwinski">
      Paweł Czerwiński
    </Link>
  </span>
)
export default Contact