import appStyle from 'App.module.css'
import aboutStyle from 'views/About.module.css'
import workStyle from 'views/Work2.module.css'

export const setCssVar = (n, v) => {
  document.documentElement.style.setProperty(`--${n}`, v)
}

export const alignLayout = () => {
  alignAbout()
  // alignWork()
}

export const alignAbout = () => {
  const aboutLeft = document.querySelector(`.${aboutStyle.left}`)
  const aboutRight = document.querySelector(`.${aboutStyle.right}`)
  const aboutImage = document.querySelector(`.${aboutStyle.image}`)
  const textWrapper = aboutRight.querySelector(`.${aboutStyle.textWrapper}`)
  const overlayNav = document.querySelector(`.${appStyle.overlayTop}`)

  if(overlayNav) {
    aboutLeft.style.width = `calc(${overlayNav.offsetWidth}px + 2rem)` //2rem offset + 2rem padding - 1rem link padding
    aboutLeft.style.minWidth = `calc(${overlayNav.offsetWidth}px + 2rem)` //2rem offset + 2rem padding - 1rem link padding
  }
  const marginLeft = `${Math.max(aboutImage.clientWidth - aboutLeft.clientWidth + 32, 0)}px`
  textWrapper.style.marginLeft = `calc(${marginLeft} + 2rem)`
  aboutImage.style.minWidth = `calc(${aboutLeft.offsetWidth}px - 4rem)`
}

export const alignWork = () => {
  const overlayNav = document.querySelector(`.${appStyle.overlayTop}`)
  const workLeft = document.querySelector(`.${workStyle.left}`)
  workLeft.style.minWidth = `calc(${overlayNav.clientWidth}px + 2rem)`
  workLeft.style.width = `calc(${overlayNav.clientWidth}px + 2rem)`

  // setCssVar('work-left-width', `calc(${overlayNav.clientWidth}px + 2rem)`)
}