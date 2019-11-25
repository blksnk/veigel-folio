import aboutStyle from 'views/About.module.css'
import appStyle from 'App.module.css'


export const alignLayout = () => {
  alignAbout()
}

export const alignAbout = () => {
  const aboutLeft = document.querySelector(`.${aboutStyle.left}`)
  const aboutRight = document.querySelector(`.${aboutStyle.right}`)
  const aboutImage = document.querySelector(`.${aboutStyle.image}`)
  const textWrapper = aboutRight.querySelector(`.${aboutStyle.textWrapper}`)
  const overlayNav = document.querySelector(`.${appStyle.overlayTop}`)

  aboutLeft.style.width = `calc(${overlayNav.offsetWidth}px + 2rem)` //2rem offset + 2rem padding - 1rem link padding
  aboutLeft.style.minWidth = `calc(${overlayNav.offsetWidth}px + 2rem)` //2rem offset + 2rem padding - 1rem link padding
  const marginLeft = `${Math.max(aboutImage.clientWidth - aboutLeft.clientWidth + 32, 0)}px`
  textWrapper.style.marginLeft = `calc(${marginLeft} + 2rem)`
  aboutImage.style.minWidth = `calc(${aboutLeft.offsetWidth}px - 4rem)`
}