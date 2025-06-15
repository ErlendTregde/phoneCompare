<template>
  <ComparisonNormal
    v-if="!isStackedView"
    :phoneData="phoneData"
    :selectedPhones="selectedPhones"
    :viewMode="viewMode"
    :scaleMode="scaleMode"
    :showDimensions="showDimensions"
    :colorMap="colorMap"
  />
  <ComparisonStacked
    v-else
    :phoneData="phoneData"
    :selectedPhones="selectedPhones"
    :colorMap="colorMap"
    :sizePercent="sizePercent"
    :showDimensions="showDimensions"
  />
</template>

<script setup>
import ComparisonNormal from './ComparisonNormal.vue'
import ComparisonStacked from './ComparisonStacked.vue'

const props = defineProps({
  phoneData: Object,
  selectedPhones: Array,
  viewMode: String,
  scaleMode: String,
  showDimensions: Boolean,
  colorMap: Object,
  isStackedView: Boolean,
  sizePercent: Number
})
</script> 