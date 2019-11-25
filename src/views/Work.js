import React from 'react'
import { withRouter } from 'react-router-dom'
import { initScroller } from 'helpers/scroll.js'
import { FullSection } from 'components/Section.js'

import s from './Work.module.css'

import bg3 from 'assets/images/bg3.jpg'
import schneider from 'assets/images/schneider.jpg'
import pepit from 'assets/images/pepit.jpg'
import victoire from 'assets/images/victoire.jpg'
import roadeo from 'assets/images/roadeo.jpg'

const Work = ({ history }) => {
  const [ ref, setRef ] = React.useState(null)
  const [ loaded, setLoaded ] = React.useState(false)
  const projects = [
    {
      title: 'Kernel Panic',
      client: 'Wolfox',
      date: 2019,
      subtitle: 'Note taking webapp',
      description: 'Ut ea eiusmod aliqua in ex nulla elit nostrud ut exercitation amet in non culpa aute commodo ut.',
      thumb: bg3,
      keywords: ['ideas', 'community', 'discussion'],
      tech: ['react', 'express', 'postgresql']
    }, {
      title: 'Roadeo',
      client: 'Roadeo',
      date: 2019,
      subtitle: 'Travel oriented mobile app and web companion',
      description: 'Ut ea eiusmod aliqua in ex nulla elit nostrud ut exercitation amet in non culpa aute commodo ut.',
      thumb: roadeo,
      keywords: ['travel', 'memories', 'social'],
      tech: ['react', 'redux', 'react native', 'express', 'postgresql']
    }, {
      title: 'Victoire Soller',
      client: 'Victoire Soller',
      date: 2019,
      subtitle: "Architect's portfolio",
      description: 'Ut ea eiusmod aliqua in ex nulla elit nostrud ut exercitation amet in non culpa aute commodo ut.',
      thumb: victoire,
      keywords: ['architecture', 'personal', 'portfolio'],
      tech: ['react', 'desktop only', 'gsap']
    },  {
      title: 'Pep-IT',
      client: 'Datavalue Consulting',
      date: 2019,
      subtitle: 'Client / Freelance matching platform',
      description: 'Ut ea eiusmod aliqua in ex nulla elit nostrud ut exercitation amet in non culpa aute commodo ut.',
      thumb: pepit,
      keywords: ['business', 'platform', 'profile matching'],
      tech: ['react', 'redux', 'firebase', 'nosql']
    }, {
      title: 'SafeRepository',
      client: 'Schneider Electric',
      date: 2019,
      subtitle: 'Utility oriented progressive web app',
      description: 'Ut ea eiusmod aliqua in ex nulla elit nostrud ut exercitation amet in non culpa aute commodo ut.',
      thumb: schneider,
      keywords: ['business', 'documentation', 'tool'],
      tech: ['react', 'redux', 'express', 'postgresql']
    },
  ]

  React.useEffect(() => {
    if(!loaded) {
      if(ref) {
        // initScroller(ref)
        setLoaded(true)
      }
    }
  }, [ ref, loaded, setLoaded ])

  return (
    <FullSection className={s.page} id='section1'>
        {projects.reverse().map((project, i) => <Card index={i} project={project} key={`card${i}`}/>)}
    </FullSection>
  )
}

const Card = ({ project, index }) => { //card for displaying each project, needs some more work but basic design is down
  const [ expanded, setExpanded ] = React.useState(false)
  return (
    <React.Fragment>
      <div className={`${s.card} ${index % 2 === 0 ? '' : s.cardBtm}`}>
        <div onClick={() => setExpanded(!expanded)} className={`${s.cardImage} ${!expanded ? 'link' : ''}`} style={{ backgroundImage: `url(${project.thumb})` }}></div>
        <div className={s.cardText}>
          <h1 className={s.cardTitle}>{project.title}</h1>
          <p className={s.cardKeywords}>{assembleKeywords(project.keywords)}</p>
          <p className={s.cardTech}>{assembleKeywords(project.tech)}</p>
        </div>
      </div>
    </React.Fragment>
  )
}

const assembleKeywords = keywords => {
  return keywords.join(' / ')
}


export default withRouter(Work)