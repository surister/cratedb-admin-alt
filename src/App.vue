<template>
  <router-view/>
  <snackbar/>
</template>

<script setup>
  //
import Snackbar from "@/components/shared/snackbars/Snackbar.vue";
</script>

<style>
body:after{
  content: "Alpha";
  position: fixed;
  width: 80px;
  height: 25px;
  background: #EE8E4A;
  top: 7px;
  left: -20px;
  text-align: center;
  font-size: 13px;
  font-family: sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  line-height: 27px;
  transform:rotate(-45deg);
  z-index: 999999;
}

.v-theme--dark svg text {
  fill: white !important;
}
.v-theme--dark .apexcharts-legend-text {
  color: white !important;
  fill: white !important;
}
.v-theme--dark .apexcharts-menu {
    background: #424242;
}
</style>
