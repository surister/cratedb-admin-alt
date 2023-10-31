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
      key: 'CRATE_TABLE'
    },
    DROP_TABLE: {
      level: 3,
      description: 'A table was dropped',
      key: 'DROP TABLE'
    }
  }

  // TODO User is currently hardcoded, at some point
  // when we have the ability to log different users,
  // we should fix this.
  async function log(action, context, user='crate') {
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
    log
  }
})
