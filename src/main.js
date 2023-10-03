/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

import ace from 'ace-builds';

import modeJsonUrl from 'ace-builds/src-noconflict/mode-sql?url';
ace.config.setModuleUrl('ace/mode/sql', modeJsonUrl);

// Check themes at https://ace.c9.io/build/kitchen-sink.html
import themeChromeUrl from 'ace-builds/src-noconflict/theme-chrome?url';
ace.config.setModuleUrl('ace/theme/chrome', themeChromeUrl);

registerPlugins(app)

app.mount('#app')
