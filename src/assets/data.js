import schneiderThumb from 'assets/images/schneider_thumb.jpg'
import pepitThumb from 'assets/images/pepit_thumb.jpg'
import victoireThumb from 'assets/images/victoire_thumb.jpg'
import roadeoThumb from 'assets/images/roadeo_thumb.jpg'
import rdjwskThumb from 'assets/images/rdjwsk_thumb.jpg'
import kernelpanicThumb from 'assets/images/kernelpanic_thumb.jpg'

export const projects = [
  {
    title: 'Kernel Panic',
    client: 'Wolfox',
    date: 2018,
    subtitle: 'Note taking webapp',
    description: `In-house note taking web app project. Enables easy priotization of ideas, projects and tasks. Users can comment and react to each other's comments, to better focus a whole team's effort.`,
    link: 'https://www.google.com',
    thumb: kernelpanicThumb,
    keywords: ['ideas', 'community', 'discussion'],
    tech: ['react', 'express', 'postgresql'],
  }, {
    title: 'Roadeo',
    client: 'Roadeo',
    date: 2019,
    subtitle: 'Travel oriented mobile app and web companion',
    description: 'Ut ea eiusmod aliqua in ex nulla elit nostrud ut exercitation amet in non culpa aute commodo ut.',
    link: 'https://www.google.com',
    thumb: roadeoThumb,
    keywords: ['travel', 'memories', 'social'],
    tech: ['react', 'redux', 'react native', 'express', 'postgresql']
  }, {
    title: 'Victoire Soller',
    client: 'Victoire Soller',
    date: 2019,
    subtitle: "Architect's portfolio",
    description: 'Ut ea eiusmod aliqua in ex nulla elit nostrud ut exercitation amet in non culpa aute commodo ut.',
    link: 'https://www.google.com',
    thumb: victoireThumb,
    keywords: ['architecture', 'personal', 'portfolio'],
    tech: ['react', 'desktop only', 'gsap']
  },  {
    title: 'Pep-IT',
    client: 'Datavalue Consulting',
    date: 2019,
    subtitle: 'Client / Freelance matching platform',
    description: 'Ut ea eiusmod aliqua in ex nulla elit nostrud ut exercitation amet in non culpa aute commodo ut.',
    link: 'https://www.google.com',
    thumb: pepitThumb,
    keywords: ['business', 'platform', 'profile matching'],
    tech: ['react', 'redux', 'firebase', 'nosql']
  }, {
    title: 'Safe Repository',
    client: 'Schneider Electric',
    date: 2019,
    subtitle: 'Utility oriented progressive web app',
    description: 'Ut ea eiusmod aliqua in ex nulla elit nostrud ut exercitation amet in non culpa aute commodo ut.',
    link: 'https://www.google.com',
    thumb: schneiderThumb,
    keywords: ['business', 'documentation', 'tool'],
    tech: ['react', 'redux', 'express', 'postgresql']
  }, {
    title: 'RDJWSK',
    client: 'Tristan Radajewski',
    date: 2019,
    subtitle: "Music maker's portfolio",
    description: 'Ut ea eiusmod aliqua in ex nulla elit nostrud ut exercitation amet in non culpa aute commodo ut.',
    link: 'https://www.google.com',
    thumb: rdjwskThumb,
    keywords: ['music', 'porfolio', 'brutalist', 'minimalist'],
    tech: ['react', 'redux', 'strapi', 'nosql']
  },
].reverse()

export const clients = [
  'Wolfox',
  'Datavalue Consulting',
  'Schneider Electric',
  'Roadeo',
  'Victoire Soller',
  'Tristan Radajewski'
]

export const skills = [
  'Javascript ES6',
  'CSS3',
  'HTML5',
  'React',
  'Redux',
  'Babel',
  'Angular',
  'Express',
  'MongoDB',
  'Firebase',
  'PostgreSQL',
  'Amazon Web Services',
  'PIXI',
  'GSAP',
]

export const links = [
  // {
  //   href: '/',
  //   title: 'Home'
  // }, 
  {
    href: '/',
    title: 'Work',
    menuTitle: 'Work',
  }, {
    href: '/about',
    title: 'About',
    menuTitle: 'About',

  }, {
    href: '/contact',
    title: 'Contact',
    menuTitle: 'Contact',
  }
]

export const socials = [
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jn-veigel',
  }, {
    title: 'Github',
    href: 'https://www.github.com/blksnk',
  }, 
  // {
  //   title: 'Gitlab',
  //   href: 'https://www.gitlab.com/blksnk',
  // }, 
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/chxmpetre',
  }
]