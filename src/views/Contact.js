import React from 'react'
import { HalfSection, Link } from 'components/Section.js'
import s from './Contact.module.css'

const Contact = () => {
  return (
    <HalfSection className={s.page} left  id='section3'>
      <p className={s.text}>
        If you wish to keep up to date on my work, feel free to follow me on my socials.
      </p>
      <p className={s.text}>
        For professional opportunities, general information or to send memes, <br/> please get in touch at the email below.
      </p>
      <Link className={s.email} img title='send me an email' href='mailto:hello@veigel.dev'>hello@veigel.dev</Link>
      {/*<Credit/>*/}
    </HalfSection>
  )
}

export default Contact