<script setup>
const items = [
  {title: 'Github', icon: 'mdi-github', link: ''},
  {title: 'Stack Overflow', icon: 'mdi-stack-overflow', link: ''},
  {title: 'Documentation', icon: 'mdi-file-document-outline', link: ''},
  {title: 'Forum', icon: 'mdi-forum', link: ''},
  {title: 'Latest release', icon: 'mdi-alert-decagram', link: ''},
]
</script>

<template>
  <v-menu
    close-delay="100"
    location="bottom end"
    open-delay="60"
    open-on-hover
  >
    <template v-slot:activator="{ props }">
      <v-btn class="ml-2" v-bind="props" text="Support" variant="tonal"/>
    </template>

    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :prepend-icon="item.icon"
        :link="true"
        :title="item.title">
      </v-list-item>
    </v-list>
  </v-menu>

</template>

<style scoped>

</style>
