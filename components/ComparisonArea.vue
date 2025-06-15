<template>
  <div class="comparison-area">
    <template v-if="selectedPhones.length === 0">
      <div class="empty-message">Select a phone to compare</div>
    </template>
    <template v-else>
      <ComparisonToolbar
        :showDimensions="showDimensions"
        :sizePercent="sizePercent"
        @toggle-dimensions="showDimensions = !showDimensions"
        @set-size="setSizePercent"
        @increase-size="increaseSize"
        @decrease-size="decreaseSize"
      />
      <div class="toolbar-spacer"></div>
      <PhoneRows
        :phoneData="phoneData"
        :selectedPhones="selectedPhones"
        :viewMode="viewMode"
        :scaleMode="scaleMode"
        :showDimensions="showDimensions"
        :colorMap="phoneColorMap"
      />
      <PhoneStatsTable />
    </template>
  </div>
</template>

<script setup>
import { inject, reactive, watch } from 'vue'
import ComparisonToolbar from './ComparisonToolbar.vue'
import PhoneRows from './PhoneRows.vue'
import PhoneStatsTable from './PhoneStatsTable.vue'

const phoneData = inject('phoneData')
const selectedPhones = inject('selectedPhones')
const viewMode = inject('viewMode')
const scaleMode = inject('scaleMode')
const showDimensions = inject('showDimensions')
const sizePercent = inject('sizePercent')
const setSizePercent = inject('setSizePercent')
const increaseSize = inject('increaseSize')
const decreaseSize = inject('decreaseSize')

const colorPalette = ['#4a9eff', '#ffff4a', '#a44aff', '#ff4a4a', '#ffb84a', '#00e0ff']
const phoneColorMap = reactive({})

function assignColors() {
  // Remove colors for phones no longer selected
  Object.keys(phoneColorMap).forEach(id => {
    if (!selectedPhones.includes(id)) delete phoneColorMap[id]
  })
  // Assign available colors to uncolored phones
  let usedColors = Object.values(phoneColorMap)
  selectedPhones.forEach(id => {
    if (!phoneColorMap[id]) {
      const available = colorPalette.find(c => !usedColors.includes(c))
      if (available) {
        phoneColorMap[id] = available
        usedColors.push(available)
      }
    }
  })
}

watch(selectedPhones, assignColors, { immediate: true, deep: true })
</script>

<style scoped>
.comparison-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  padding: 2rem;
  position: relative;
  flex: 1 1 0;
  width: 100%;
  margin-top: 2.2rem;
}
.empty-message {
  color: #888;
  font-size: 1.3rem;
  text-align: center;
  margin-top: 2rem;
  letter-spacing: 0.02em;
}
.toolbar-spacer {
  height: 80px;
}
@media (max-width: 700px) {
  .toolbar-spacer {
    height: 110px;
  }
}
</style>
