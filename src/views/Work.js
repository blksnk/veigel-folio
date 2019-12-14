import React from 'react'
import { withRouter } from 'react-router-dom'
import { initHovers } from 'helpers/cursor.js'
import { animateWorkOpen, animateWorkClose, animatePageEnterWork } from 'helpers/animate.js'
import { FullSection, Link } from 'components/Section.js'
import TextCircle from 'components/TextCircle.js'
import { ScrollBar } from 'components/ScrollIndicator.js'

import { projects } from 'assets/data.js'
import n from './Work2.module.css'

const Work = ({ history, isMobile }) => {
  const [ openIndex, setOpenIndex ] = React.useState(0)
  const [ isOpen, setIsOpen ] = React.useState(false)
  const pageRef = React.useRef(null)
  const projectRef = React.useRef(null)

  const openProject = i => {
    if(!isOpen) {
      requestAnimationFrame(() => {
        setOpenIndex(i)
        setIsOpen(i)
        animateWorkOpen(isMobile)
      })
    }
  }

  const closePanel = () => {
    animateWorkClose(isMobile)
    setTimeout(() => setIsOpen(false), 500)
  }

  React.useEffect(() => {
      initHovers()
      animatePageEnterWork()
  }, [])

  return (
    <FullSection className={n.page} style={{ overflowY: isOpen ? 'hidden' : 'auto' }} id='section1'>
      {!isMobile
        ? <Left openIndex={openIndex} isOpen={isOpen} setIsOpen={setIsOpen}/>
        : null
      }
      <Right openProject={openProject} ref={pageRef}  />
      <Project projects={projects} isMobile={isMobile} openIndex={openIndex} setIsOpen={setIsOpen} ref={projectRef}/>
      <div className={n.circleContainer}>
        <TextCircle color='#F97C07' className={n.circle}>You might want to scroll.</TextCircle>
      </div>
      <button className={`${n.closeBtn} link linkHover`} onClick={closePanel}>Close</button>

      <ScrollBar parent={isOpen ? projectRef.current : pageRef.current}/>
    </FullSection>
  )
}

const displayIndex = i => i < 10 ? `0${i+1}` : String(i+1)

const Left = ({ openIndex, setIsOpen, isOpen }) => {
  return (
    <aside className={n.left}>
      <h1 className={n.pageTitle}>
        SELECTED<br/>
        WORK
      </h1>
    </aside>
  )
}

const Right = React.forwardRef(({ openProject }, ref) => {
  const projectTitles = projects.map(item => item.title)
  return (
    <div className={n.right} ref={ref}>
      <ul className={n.list}>
        {projectTitles.map((item, index) => (
          <li
            data-text={item}
            className={`${n.projectTitle} link hover-start`}
            onClick={e => openProject(index)}
            key={`title${index}`}
          >
            <span className={n.pIndex}>{displayIndex(index)}</span>
            <h1>{item}</h1>
          </li>
        ))}
      </ul>
    </div>
  ) 
})

const Project = React.forwardRef(({ projects, openIndex, setIsOpen, isMobile }, ref) => {
  const project = projects[openIndex]
  return (
    <div className={n.project} ref={ref}>
      <h1 className={n.projectPageProjectTitle}>{project.title}</h1>
      {/*<p className={n.pDesc}>{project.description}</p>*/}
      <Link className={n.pLink} img={!isMobile} onClick={() => {
        window.open(project.link)
      }}>See it for yourself</Link>
      <div className={n.pInfo}>
        <div>
          <span>Made&mdash; <span className={n.pBold}>{project.date}</span></span>
          <span>Client&mdash; <span className={n.pBold}>{project.client}</span></span>
        </div>

        <div>
          <span>Technology&mdash; <span className={n.pBold}>{assembleKeywords(project.tech)}</span></span>
        </div>

        <div>
          <span>Keywords&mdash; <span className={n.pBold}>{assembleKeywords(project.keywords)}</span></span>
        </div>
      </div>
      <div className={n.pBannerWrapper}>
        {projects.map(( { thumb }, index) => (
          <div key={`thumb${index}`} className={`${n.pBanner} ${openIndex === index ? n.pBannerActive : ''}`} style={{ backgroundImage: `url(${thumb})` }}></div>
        ))}
      </div>
    </div>
  )
})

const assembleKeywords = keywords => {
  return keywords.join(` / `)
}


export default withRouter(Work)