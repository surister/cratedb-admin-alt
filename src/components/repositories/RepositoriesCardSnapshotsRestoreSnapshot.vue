<script setup>
import ButtonWithDialog from "@/components/shared/buttons/ButtonWithDialog.vue";
import {computed, ref} from "vue";
import {format_sql} from "@/store/utils";
import {use_repositories_store} from "@/store/repositories";

const props = defineProps({
    snapshot: {
        required: true,
        type: Object
    },

})

const metadata_items = ['VIEWS', 'USERS', 'PRIVILEGES', 'ANALYZERS', 'UDFS']

const options = ref({
    everything: false,
    all_the_tables: false,
    only_metadata: false,
    metadata: [],
    tables: []
})

function generate_sql() {
    let BASE_SQL = `RESTORE SNAPSHOT "${repository_store.current_open_repository.name}"."${props.snapshot.name}"`

    if (options.value.everything) {
        BASE_SQL += ' ALL'
        return BASE_SQL
    }

    if (options.value.all_the_tables) {
        BASE_SQL += ' TABLES'
    } else {
        if (options.value.tables.length !== 0) {
            BASE_SQL += ' TABLE'
        }
        for (const table of options.value.tables) {
            BASE_SQL += ` ${table}${options.value.tables.at(-1) !== table ? ',' : ''}`
        }

        if (options.value.metadata.length !== 0 && options.value.tables.length !== 0) {
            BASE_SQL += ','
        }
    }

    if (options.value.all_the_tables && options.value.metadata.length !== 0) {
        BASE_SQL += ','
    }

    for (const meta of options.value.metadata) {
        BASE_SQL += ` ${meta}${options.value.metadata.at(-1) !== meta ? ',' : ''}`
    }

    return BASE_SQL
}

const sql = computed(() => generate_sql())
const repository_store = use_repositories_store()
</script>

<template>
    <button-with-dialog tooltip-text="Restore snapshot"
                        activator-btn-variant="tonal"
                        activator-btn-text="restore"
                        dialog-title="Restore snapshot"
                        dialog-width="600"
                        dialog-submit-btn-text="restore"
                        dialog-submit-btn-color="primary"
                        :submit-callback="() => repository_store.restore_snapshot(sql)">
        <template #dialog-content>

            <v-banner color="info" icon="mdi-information">
                <template #text>
                    <p>
                        If you try to restore a table that already exists, CrateDB will return an
                        error.
                        <br><br>
                        However, if you try to restore metadata or cluster settings that already
                        exist, they
                        will be
                        overwritten.
                        <br><br>
                        Read more about it in <a
                            href="https://cratedb.com/docs/crate/reference/en/latest/sql/statements/restore-snapshot.html#description">here</a>
                    </p>
                </template>
            </v-banner>

            <v-container>

                <v-row>

                    <v-col>
                        <v-checkbox label="Everything"
                                    v-model="options.everything"
                                    :disabled="options.all_the_tables || options.only_metadata"/>
                    </v-col>

                    <v-col>
                        <v-checkbox label="All the tables"
                                    v-model="options.all_the_tables"
                                    :disabled="options.everything || options.only_metadata"/>
                    </v-col>

                    <v-col>
                        <v-checkbox label="Only metadata"
                                    v-model="options.only_metadata"
                                    :disabled="options.everything || options.all_the_tables"/>
                    </v-col>

                </v-row>

                <v-row no-gutters>

                    <v-col class="px-2">
                        <v-select label="Tables"
                                  :disabled="options.everything || options.all_the_tables || options.only_metadata"
                                  :items="props.snapshot.tables"
                                  v-model="options.tables"
                                  multiple/>
                    </v-col>

                    <v-col class="px-2">
                        <v-select label="Metadata"
                                  :items="metadata_items"
                                  v-model="options.metadata"
                                  :disabled="options.everything"
                                  multiple/>
                    </v-col>

                </v-row>

                Preview:
                <v-code tag="pre">
                    {{ format_sql(sql) }}
                </v-code>
            </v-container>


        </template>
    </button-with-dialog>
</template>

<style scoped>

</style>
