import {defineStore} from "pinia";
import {computed, reactive, toRefs} from "vue";
import {request_crate} from "@/store/http/requests";
import {tr} from "vuetify/locale";

const NETFLIX_TUTORIAL_NOTEBOOK = {
    "name": "Netflix Tutorial",
    "current_focussed_cell_index": null,
    "last_created_cell_index": 8,
    "cells": [{
        "id": 0,
        "name": "Intro",
        "content": "%md CrateDB is an exceptional choice for handling complex queries and large-scale data sets. One of its standout features is its full-text search capabilities, built on top of the powerful Lucene library.\nThis makes it a great fit for organizing, searching, and analyzing extensive datasets.\n\n<br>\n\nIn this tutorial, we will explore how to manage a dataset of Netflix titles, making use of CrateDB Cloud’s full-text search capabilities.\nEach entry in our imaginary dataset will have the following attributes:\n\n<br>\n\n    1. show_id - a unique identifier for each show or movie.\n    2. type - specified whether the title is a movie, TV show, or another format.\n    3. title - the title of the movie or show.\n    4. director - the name of the director.\n    5. cast - an array listing the cast members.\n    6. country - the country where the title was produced.\n    7. date_added - a timestamp indicating when the title was added to the catalog.\n    8. release_year - the year the title was released.\n    9. rating - the content rating (e.g., PG, R, etc.).\n    10. duration - the duration of the title in minutes or seasons.\n    11. listed_in - an array containing genres that the title falls under.\n    12. description - a textual description of the title, indexed using full-text search.\n",
        "cursor_is_at_the_end": true,
        "cursor_is_at_the_beginning": false,
        "is_running": false,
        "response": {"type": ""},
        "is_markdown": true
    }, {
        "id": 1,
        "name": "Create table",
        "content": "CREATE TABLE \"netflix_catalog\" (\n \"show_id\" TEXT PRIMARY KEY,\n \"type\" TEXT,\n \"title\" TEXT,\n \"director\" TEXT,\n \"cast\" ARRAY(TEXT),\n \"country\" TEXT,\n \"date_added\" TIMESTAMP,\n \"release_year\" TEXT,\n \"rating\" TEXT,\n \"duration\" TEXT,\n \"listed_in\" ARRAY(TEXT),\n \"description\" TEXT INDEX using fulltext\n);",
        "cursor_is_at_the_beginning": true,
        "cursor_is_at_the_end": true,
        "response": {"type": ""},
        "is_running": false
    }, {
        "id": 2,
        "name": "Copy data",
        "content": "COPY netflix_catalog\nFROM\n 'https://github.com/crate/cratedb-datasets/raw/main/cloud-tutorials/data_netflix.json.gz' WITH (format = 'json', compression = 'gzip');",
        "cursor_is_at_the_beginning": true,
        "cursor_is_at_the_end": true,
        "response": {"type": ""},
        "is_running": false
    }, {
        "id": 3,
        "name": "Full-text search",
        "content": "%md ### Using Full-text search\n\n\nStart with a basic SELECT statement on all columns, and limit the output to display only 10 records, in order to quickly explore a few samples worth of data.",
        "cursor_is_at_the_beginning": true,
        "cursor_is_at_the_end": true,
        "response": {"type": ""},
        "is_markdown": true
    }, {
        "id": 4,
        "name": "Sampling",
        "content": "SELECT\n *\nFROM\n netflix_catalog\nLIMIT\n 10;",
        "cursor_is_at_the_beginning": false,
        "cursor_is_at_the_end": true,
        "response": {"type": ""},
        "is_running": false
    }, {
        "id": 5,
        "name": "Full-text search 2",
        "content": "%md CrateDB Cloud’s full-text search can be leveraged to find specific entries based on text matching. In this query, you are using the MATCH function on the description field to find all movies or TV shows that contain the word “love”.\nThe results can be sorted by relevance score by using the synthetic _score column.",
        "cursor_is_at_the_beginning": true,
        "cursor_is_at_the_end": true,
        "response": {"type": ""},
        "is_markdown": true
    }, {
        "id": 6,
        "name": "More full text search",
        "content": "SELECT\n title,\n description,\n _score\nFROM\n netflix_catalog\nWHERE\n MATCH(description, 'love')\nORDER BY\n _score DESC\nLIMIT\n 10;",
        "cursor_is_at_the_beginning": true,
        "cursor_is_at_the_end": true,
        "response": {"type": ""},
        "is_running": false
    }]
}

export const use_notebooks_store = defineStore('notebooks', () => {
    const state = reactive({
        notebook_groups: {
          current_notebook_index: 0,
          my_notebooks: [
            {
              name: 'Default',
              current_focussed_cell_index: null,
              last_created_cell_index: 0,
              cells: [
                {
                  id: 0,
                  name: 'cell 1',
                  content: '',
                  cursor_is_at_the_end: true,
                  cursor_is_at_the_beginning: true,
                  is_running: false,
                  response:
                    {
                      type: '',
                    }
                }
              ]
            },
          ],
          tutorials: [
              NETFLIX_TUTORIAL_NOTEBOOK
          ]
        },
        selected_notebook_group: 'my_notebooks'
    })

    const current_notebook = computed(() => state.notebook_groups[state.selected_notebook_group][state.notebook_groups.current_notebook_index])
    const current_cell = computed(() => current_notebook.value.cells[current_notebook.value.current_focussed_cell_index])

    async function create_notebook(){
        state.notebook_groups.my_notebooks.push({
            name: 'new_notebook',
            current_focussed_cell_index: null,
            last_created_cell_index: 0,
            cells: [
                {
                    id: 0,
                    name: 'cell 1',
                    content: '',
                    cursor_is_at_the_end: true,
                    cursor_is_at_the_beginning: true,
                    is_running: false,
                    is_markdown: false,
                    response:
                        {
                            type: '',
                        }
                }
            ]
        },)
    }
    async function run_cell(cell_index, cell_id) {
      // If call by cell_index we know it was called via keyboard, cell_id via button
      // perhaps we should just allow by cell_id? the thing is that if we get the cell_index and
      // thus current_cell, it'd depend on current_notebook.current_focussed_cell_index, we'd end up
      // getting the cell_id from there.
      let cell = cell_id != null ? current_notebook.value.cells.filter((cell) => cell.id === cell_id)[0] : current_cell.value
      cell.response = {type: '',}

      if (cell.content.startsWith('%md')) {
        cell.is_markdown = true

        return
      }

      cell.is_running = true
      const _response = await request_crate(
        cell.content,
        'error_trace=true',
        {},
        true)
      const json_response = await _response.json()
      if (_response.ok) {
        cell.response.type = 'success'
        cell.response.label = `Command took ${(json_response.duration / 1000).toFixed(4)}s - ${json_response.rowcount} record(s) at ${new Date().toLocaleString()} `
        cell.response.data = {
          rows: json_response.rows,
          headers: json_response.cols,
          row_count: json_response.row_count
        }
      } else {
        cell.response.type = 'error'
        cell.response.label = json_response.error.message
        cell.response.traceback = json_response.error_trace
      }

      cell.is_running = false
    }

    return {
        ...toRefs(state),
        run_cell,
        current_cell,
        current_notebook,
        create_notebook
    }
}, {
    persist: true
})
