import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import i18n from 'i18next'
import { I18nextProvider } from "react-i18next"
import detector from 'i18next-browser-languagedetector'
import common_en from 'assets/translations/common_en.json'
import work_en from 'assets/translations/work_en.json'
import about_en from 'assets/translations/about_en.json'
import contact_en from 'assets/translations/contact_en.json'
import common_fr from 'assets/translations/common_fr.json'
import work_fr from 'assets/translations/work_fr.json'
import about_fr from 'assets/translations/about_fr.json'
import contact_fr from 'assets/translations/contact_fr.json'

import 'stylesheets/fonts.css'
import 'stylesheets/root.css'
import 'stylesheets/hamburgers.css'
import 'stylesheets/animation.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

i18n
  .use(detector)
  .init({
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        common: common_en,
        work: work_en,
        about: about_en,
        contact: contact_en,
      },
      fr: {
        common: common_fr,
        work: work_fr,
        about: about_fr,
        contact: contact_fr,
      }
    },
    fallbackLng: "en",
  }
)

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </I18nextProvider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
