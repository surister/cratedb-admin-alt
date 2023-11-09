<script setup>
import {VAceEditor} from "vue3-ace-editor";
import {use_console_store} from "@/store/console_store";
import {use_stored_preferences_store} from "@/store/storedPreferences";
import 'ace-builds/src-noconflict/ext-language_tools'
import langTools from 'ace-builds/src-noconflict/ext-language_tools'
import {onMounted, ref} from "vue";
import 'ace-builds/src-noconflict/ace'

const console_store = use_console_store()
const stored_preferences = use_stored_preferences_store()

const props = defineProps({
  minLines: {
    default: null,
    type: [Number, String]
  },
  maxLines: {
    default: null,
    type: [Number, String]
  },
  content: {
    default: null
  }
})

const editor = ref(null)


function group_keywords(arr, token) {
  let result_array = []
  for (const el of arr) {
    result_array.push(
      {
        token: token,
        value: el,
        regex: el,
      }
    )
  }
  return result_array
}

const kwmap = [
  {defaultToken: "text"},
  {
    token: "comment",
    regex: "--.*$"
  },
  {
    token: "string",
    regex: '".*?"'
  },
  {
    token: "string",
    regex: "'.*?'"
  },
  {
    token: "string",
    regex: "`.*?`"
  },
  ...group_keywords(
    ['true', 'false',], 'value'
  ),
  ...group_keywords(
    [
        'ALTER CLUSTER',
        'ALTER PUBLICATION',
        'ALTER TABLE',
        'ALTER USER',
        'ANALYZE',
        'BEGIN',
        'CLOSE',
        'COMMIT',
        'COPY FROM',
        'COPY TO',
        'CREATE ANALYZER',
        'CREATE BLOB TABLE',
        'CREATE PUBLICATION',
        'CREATE REPOSITORY',
        'CREATE SNAPSHOT',
        'CREATE SUBSCRIPTION',
        'CREATE TABLE',
        'CREATE USER',
        'CREATE VIEW',
        'DEALLOCATE',
        'DECLARE',
        'DELETE',
        'DENY',
        'DISCARD',
        'DROP ANALYZER',
        'DROP FUNCTION',
        'DROP PUBLICATION',
        'DROP REPOSITORY',
        'DROP SNAPSHOT',
        'DROP SUBSCRIPTION',
        'DROP TABLE',
        'DROP USER',
        'DROP VIEW',
        'END',
        'EXPLAIN',
        'FETCH',
        'GRANT',
        'INSERT',
        'KILL',
        'OPTIMIZE',
        'REFRESH',
        'RESTORE SNAPSHOT',
        'REVOKE',
        'SELECT',
        'SET and RESET',
        'SET LICENSE',
        'SET AND RESET SESSION AUTHORIZATION',
        'SET TRANSACTION',
        'SHOW',
        'SHOW COLUMNS',
        'SHOW CREATE TABLE',
        'SHOW TABLES',
        'START TRANSACTION',
        'UPDATE',
        'VALUES',
        'WITH',
        'LIMIT',
        'FROM',
        'AS',
        'DISTINCT',
        'WHERE',
        'GROUP BY',
        'ORDER BY',
        'ON',
        'RIGHT',
        'LEFT',
        'JOIN',
        'OUTER',
        'JOIN',
        'AND'
    ], 'keyword'),
  ...group_keywords(
    [
      'BOOLEAN',
      'VARCHAR',
      'TEXT',
      'CHARACTER',
      'CHAR',
      'SMALLINT',
      'INTEGER',
      'BIGINT',
      'REAL',
      'DOUBLE PRECISION',
      'NUMERIC',
      'TIMESTAMP WITH',
      'TIME ZONE',
      'TIMESTAMP WITHOUT',
      'TIME ZONE',
      'DATE',
      'TIME',
      'BIT',
      'IP',
      'OBJECT',
      'ARRAY',
      'GEO_POINT',
      'GEO_SHAPE',
      'float_vector',
      'NULL'
    ], 'datatype' ),
  ...group_keywords([
    'SUM',
    'MIN',
    'MAX'
  ], 'function')
]
onMounted(() => {
  function setup() {
    var myCompleter = {
      getCompletions: function (editor, session, pos, prefix, callback) {
        callback(null, kwmap.map(function (key) {
          return {
            caption: key.value,
            value: key.value,
            meta: key.token,
            score: 1000
          };
        }));
      }
    };
    langTools.addCompleter(myCompleter);

    editor.value.session.setMode('ace/mode/text', function () {
      var rules = editor.value.session.$mode.$highlightRules.getRules();
      for (const rule of kwmap) {
        rules['start'].unshift({
          token: rule.token,
          regex: rule.regex
        });
      }

      // force recreation of tokenizer
      editor.value.session.$mode.$tokenizer = null;
      editor.value.session.bgTokenizer.setTokenizer(editor.value.session.$mode.getTokenizer());
      // force re-highlight whole document
      editor.value.session.bgTokenizer.start(0);
    })
  }

  setup()
})

</script>

<template>
  <VAceEditor
    @init="(el) => editor = el"
    v-model:value="console_store.consoles[console_store.current_console_index].content"
    :print-margin="false"
    :options="{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
      }"
    :style="{ 'font-size': stored_preferences.console.font_size + 'px' }"
    :min-lines="minLines || Number.parseInt(stored_preferences.console.min_lines)"
    :max-lines="maxLines || Number.parseInt(stored_preferences.console.max_lines)"/>
</template>

<style>
.ace_autocomplete * {
  font-size: 20px !important;
}

.ace_keyword {
  color: purple !important;
}

.ace_comment {
  color: gray !important;
}

.ace_string {
  color: green !important;
}

.ace_function {
  color: brown;
}

.ace_datatype{
  color: red;
}

.ace_value{
  color: #EE8E4A;
}
</style>
