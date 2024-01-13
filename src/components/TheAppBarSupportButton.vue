<script setup>
const items = [
  {
    title: 'Github',
    icon: 'mdi-github',
    link: 'https://github.com/crate'
  },
  {
    title: 'Stack Overflow',
    icon: 'mdi-stack-overflow',
    link: 'https://stackoverflow.com/questions/tagged/cratedb'
  },
  {
    title: 'Documentation',
    icon: 'mdi-file-document-outline',
    link: 'https://cratedb.com/docs/crate/reference/en/latest/'
  },
  {
    title: 'Forum',
    icon: 'mdi-forum',
    link: 'https://community.cratedb.com/'
  },
  {
    title: 'Latest release',
    icon: 'mdi-alert-decagram',
    link: 'https://cratedb.com/docs/crate/reference/en/latest/appendices/release-notes/'
  },
]
</script>

<template>
  <v-menu close-delay="100"
          location="bottom end"
          open-delay="60"
          open-on-hover
          class="border-sm">

    <template v-slot:activator="{ props }">
      <v-btn class="ml-2"
             v-bind="props"
             text="Support"
             variant="tonal"
             size="small"/>
    </template>

    <v-list>

      <v-list-item v-for="item in items"
                   :key="item.title"
                   :prepend-icon="item.icon"
                   :link="true"
                   :title="item.title"
                   target="_blank"
                   :href="item.link">
      </v-list-item>

    </v-list>
  </v-menu>

</template>

<style scoped>

</style>
