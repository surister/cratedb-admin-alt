<template>
  <v-btn
    v-if="!hasToggle"
    :icon="icon"
    color="medium-emphasis"
    path="theme"
    @click="onClick"
  />
</template>

<script setup>
  import { useTheme } from 'vuetify'


  // Utilities
  import { computed } from 'vue'
  import {useStoredPreferencesStore} from "@/store/storedPreferences";

  const theme = useTheme()
  const storedPreferences = useStoredPreferencesStore()
  const icon = computed(() => theme.global.name.value === 'dark'
    ? 'mdi-weather-night'
    : 'mdi-weather-sunny'
  )
  const hasToggle = computed(() => !['dark', 'light'].includes(theme.name.value))

  function onClick () {
    const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark'
    storedPreferences.theme = newTheme
    theme.global.name.value = newTheme
  }
</script>
