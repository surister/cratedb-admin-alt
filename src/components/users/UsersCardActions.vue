<script setup>

import UsersCardActionsDeleteUser from "@/components/users/UsersCardActionsDeleteUser.vue";
import UsersCardActionsAddPermissions from "@/components/users/UsersCardActionsAddPermissions.vue";
import UsersCardActionsAlterUser from "@/components/users/UsersCardActionsAlterUser.vue";
</script>

<template>
  <users-card-actions-add-permissions/>
  <users-card-actions-alter-user/>
  <users-card-actions-delete-user/>

</template>

<style scoped>

</style>
