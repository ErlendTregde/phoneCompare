<template>
  <PhoneRows
    :phoneData="phoneData"
    :selectedPhones="selectedPhones"
    :viewMode="viewMode"
    :scaleMode="scaleMode"
    :showDimensions="showDimensions"
    :colorMap="colorMap"
  />
</template>

<script setup>
const props = defineProps({
  phoneData: Object,
  selectedPhones: Array,
  viewMode: String,
  scaleMode: String,
  showDimensions: Boolean,
  colorMap: Object
})
</script> 