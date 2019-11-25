export const updateTitle = (t) => {
  document.title = `${t} — Jean-Nicolas Veigel`
export const underlineLinks = (i) => { //assigns classes for css transitions
  const links = document.querySelectorAll(`.${s.overlayTop} a`)
  links.forEach((link, index) => {
    if(index === i) {
      link.classList.add(s.activeLink)
      updateTitle(link.innerHTML)
    } else {
      link.classList.remove(s.activeLink)
    }
  })
}
}