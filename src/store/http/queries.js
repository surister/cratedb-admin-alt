export default {
  // load
  NODE_INFO: 'SELECT name, load, fs, heap, rest_url FROM SYS.NODES',
  GET_JOB_BY_STMT: "SELECT * FROM SYS.JOBS WHERE stmt = '%stmt'",
  KILL: "KILL '%id'"
}
