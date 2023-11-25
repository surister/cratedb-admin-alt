<script setup>

import {onMounted, ref} from "vue";
import {request_crate} from "@/store/http/requests";

const show_login = ref(false)
const show_help = ref(false)

let resp = null
const url = ref('http://localhost:4201/_sql')
const test_query = 'SELECT 1'

async function test_simple_fetch() {
  try {
    const response = await fetch(url.value,
      {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({'stmt': test_query}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic${btoa('crate')}`,
          "Access-Control-Allow-Headers": "authorization, access-control-allow-headers"
        },
      }
    )
  } catch (error) {
    console.log('whot')
    console.log(error)
  }
}

</script>

<template>
  <v-container fluid style="height: 100vh">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="3">
        <v-card theme="light">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field variant="outlined" label="Node Uri" v-model="url"></v-text-field>
                  <v-btn class="my-2" @click="test_simple_fetch()" prepend-icon="mdi-help-box">
                    Test node connection
                  </v-btn>
                </v-col>
              </v-row>

              <v-divider class="my-5"></v-divider>

              <v-row justify="center">
                <v-col align-self="center" class="text-left">
                  <v-btn class="my-2" @click="show_login = !show_login" prepend-icon="mdi-login"
                         text="Show login">
                  </v-btn>
                  <br>
                  <v-btn class="mt-2" prepend-icon="mdi-debug-step-over">Skip login</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-expand-transition>
            <v-card-text v-if="show_login">
              <v-container>
                <div class="mb-4">
                  <v-label text="Login to your CrateDB cluster"
                           class="font-weight-bold text-h7"/>
                </div>
                <v-label class="my-1">Username</v-label>
                <v-text-field variant="outlined"></v-text-field>
                <v-label class="my-1">Password</v-label>
                <v-text-field variant="outlined"></v-text-field>
                <v-btn exp block color="primary">Login</v-btn>
              </v-container>
            </v-card-text>
          </v-expand-transition>
          <v-expand-transition>
            <v-card-text v-if="show_help">
              {{ resp }}
            </v-card-text>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<style>
body {
  background: url("https://images-assets.nasa.gov/image/iss070e021220/iss070e021220~large.jpg") no-repeat center center !important;
}
</style>
