<script setup>
const props = defineProps(
  {
    message: String,
    icon: String,
    color: String,
    node_checks: Array[Object]
  }
)
</script>

<template>
  <v-card min-width="300" class="pa-5">
    <v-icon :icon="icon" :color="color"></v-icon>
    <v-label class="ml-1">{{ message }}</v-label>
    <template
      v-for="node_check in node_checks.node_checks" :key="node_check.id">
      <div class="pa-4">
        <v-label>Node<span class="font-weight-bold text-blue-accent-1 px-1">{{
            node_check.node_id
          }}</span>failed a check.
        </v-label>
        <br>
        <v-chip class="font-weight-bold bg-red-accent-1 mt-2">Severity {{
            node_check.severity
          }}
        </v-chip>

        <p style="max-width: 400px" class="pt-2"><strong>Reason:</strong> {{
            node_check.description
          }}</p>
      </div>
      <v-divider></v-divider>
    </template>
  </v-card>
</template>

<style scoped>

</style>
