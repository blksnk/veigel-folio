import React from 'react'
import { useTranslation } from 'react-i18next'
import { initHovers } from 'helpers/cursor.js'
import { animateWorkOpen, animateWorkClose, animatePageEnterWork } from 'helpers/animate.js'
import { FullSection, Link } from 'components/Section.js'
import TextCircle from 'components/TextCircle.js'

import { projects } from 'assets/data.js'
import s from './Work.module.css'

const Work = ({ history, isMobile }) => {
  const { t } = useTranslation('work')
  const [ openIndex, setOpenIndex ] = React.useState(0)
  const [ isOpen, setIsOpen ] = React.useState(false)

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
    <FullSection className={s.page} style={{ overflowY: isOpen ? 'hidden' : 'auto' }} id='section1'>
      {!isMobile
        ? <Left openIndex={openIndex} isOpen={isOpen} setIsOpen={setIsOpen}/>
        : null
      }
      <Right openProject={openProject} />
      <Project projects={projects} isMobile={isMobile} openIndex={openIndex} setIsOpen={setIsOpen} />
      <div className={s.circleContainer}>
        <TextCircle color='#F97C07' className={s.circle}>{t('scroll')}</TextCircle>
      </div>
      <button className={`${s.closeBtn} link linkHover`} onClick={closePanel}>Close</button>
    </FullSection>
  )
}

const displayIndex = i => i < 10 ? `0${i+1}` : String(i+1)

const Left = ({ openIndex, setIsOpen, isOpen }) => {
  return (
    <aside className={s.left}>
      <h1 className={s.pageTitle}>
        SELECTED<br/>
        WORK
      </h1>
    </aside>
  )
}

const Right = React.forwardRef(({ openProject }, ref) => {
  const projectTitles = projects.map(item => item.title)
  return (
    <div className={s.right} ref={ref}>
      <ul className={s.list}>
        {projectTitles.map((item, index) => (
          <li
            data-text={item}
            className={`${s.projectTitle} link hover-start`}
            onClick={e => openProject(index)}
            key={`title${index}`}
          >
            <span className={s.pIndex}>{displayIndex(index)}</span>
            <h1>{item}</h1>
          </li>
        ))}
      </ul>
    </div>
  ) 
})

const Project = React.forwardRef(({ projects, openIndex, setIsOpen, isMobile }, ref) => {
  const project = projects[openIndex]
  const { t } = useTranslation('work')
  return (
    <div className={s.project} ref={ref}>
      <h1 className={s.projectPageProjectTitle}>{project.title}</h1>

      <Link className={`${s.pLink} ${project.comingSoon ? s.comingSoon : ''}`} img={!isMobile} onClick={() => {
        window.open(project.link)
      }}>{project.comingSoon ? t('coming soon') : t('See it for yourself')}</Link>
      

      <div className={s.pInfo}>
        <div>
          <span>{t('Made')}&mdash; <span className={s.pBold}>{project.date}</span></span>
          <span>{t('Client')}&mdash; <span className={s.pBold}>{project.client}</span></span>
        </div>

        <div>
          <span>{t('Technology')}&mdash; <span className={s.pBold}>{assembleKeywords(project.tech)}</span></span>
        </div>

        <div>
          <span>{t('Keywords')}&mdash; <span className={s.pBold}>{assembleKeywords(project.keywords)}</span></span>
        </div>
      </div>
      <div className={s.pBannerWrapper}>
        {projects.map(( { thumb }, index) => (
          <div key={`thumb${index}`} className={`${s.pBanner} ${openIndex === index ? s.pBannerActive : ''}`} style={{ backgroundImage: `url(${thumb})` }}></div>
        ))}
      </div>
    </div>
  )
})

const assembleKeywords = keywords => {
  return keywords.join(` / `)
}


export default Work