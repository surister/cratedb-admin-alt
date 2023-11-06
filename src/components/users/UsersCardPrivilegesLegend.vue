<script setup>
const privileges_type = [
  {
    acronym: 'AL',
    name: 'Administration Language',
    allows: [
      'CREATE USER', 'DROP USER', 'SET GLOBAL'
    ]
  },
  {
    acronym: 'DQL',
    color: '',
    name: 'Data Query Language',
    allows: ['SELECT', 'SHOW', 'REFRESH', 'COPY TO'],
    and: 'user-defined functions'
  },
  {
    acronym: 'DML',
    color: '',
    name: 'Data Manipulation Language',
    allows: ['INSERT', 'COPY FROM', 'UPDATE', 'DELETE'],
  },
  {
    acronym: 'DDL',
    color: '',
    name: 'Data Definition Language',
    allows: ['CREATE TABLE', 'DROP TABLE', 'CREATE VIEW',
      'DROP VIEW', 'CREATE FUNCTION', 'DROP FUNCTION',
      'CREATE REPOSITORY', 'DROP REPOSITORY', 'CREATE SNAPSHOT',
      'DROP SNAPSHOT', 'RESTORE SNAPSHOT', 'ALTER TABLE'
    ],
  },

]
</script>

<template>
    <p>
      <template v-for="(privilege, i) in privileges_type" :key="i">
        <br>
        <v-chip variant="elevated"><strong>{{ privilege.acronym }}</strong>
        </v-chip>
        {{ privilege.name }}, allows to execute:
        <v-chip class="mr-1 my-2"
                size="small"
                v-for="(action, i) in privilege.allows"
                :key="i">
          {{ action }}
        </v-chip>
      </template>
    </p>
</template>

<style scoped>

</style>
