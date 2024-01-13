/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    options:{
      customProperties: true
    },
    themes: {
      light: {
        colors: {
          primary: '#19c0ea',
          secondary: '#00375a',
        },
      },
      dark:{
        colors: {
          background: '#09090b',
          surface: '#09090b',
          primary: '#19c0ea',
          secondary: '#00375a',
        }
      }
    },
  },
})
