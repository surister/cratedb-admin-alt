import {defineStore} from "pinia";
import {reactive, toRefs} from "vue";
import Dexie from "dexie";

export const use_log_store = defineStore('log', () => {
  const state = reactive({})

  const db = new Dexie('log_db')
  db.version(1).stores(
      {
        logs: '++id, date, user, context, type, danger'
      }
  )

  const ACTIONS = {
    CREATE_TABLE: {
      level: 1,
      description: 'A table was created',
      key: 'CRATE_TABLE',
      stmt: 'CREATE TABLE',
    },
    DROP_TABLE: {
      level: 3,
      description: 'A table was dropped',
      key: 'DROP_TABLE',
      stmt: 'DROP TABLE'
    },
    REVOKED_PERMISSION: {
      level: 2,
      description: 'A permission was revoked',
      key: 'REVOKED_PERMISSION',
      stmt: 'REVOKE'
    },
    USER_DELETED: {
      level: 2,
      description: 'A user was deleted',
      key: 'USER_DELETED',
      stmt: 'DROP USER'
    },
    USER_CREATED: {
      level: 1,
      description: 'A user was created',
      key: 'USER_CREATED',
      stmt: 'CREATE USER'
    }
  }

  async function log_stmt_if_needed(stmt) {
    for (const [_, action] of Object.entries(ACTIONS)) {
      if (stmt.includes(action.stmt)) {
          await log(action, stmt)
      }
    }
  }

  // TODO User is currently hardcoded, at some point
  // when we have the ability to log different users,
  // we should fix this.
  async function log(action, context, user = 'crate') {
    await db.logs.add({
      date: new Date(),
      user: user,
      type: action.key,
      context: context,
      danger: action.level
    })
  }

  return {
    ...toRefs(state),
    db,
    ACTIONS,
    log,
    log_stmt_if_needed
  }
})
