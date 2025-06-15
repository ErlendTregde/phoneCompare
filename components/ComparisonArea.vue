<template>
  <div class="comparison-area">
    <template v-if="selectedPhones.length === 0">
      <div class="empty-message">Select a phone to compare</div>
    </template>
    <template v-else>
      <div class="toolbar-row" v-if="!isTableView">
        <div class="toolbar-left">
          <button class="toggle-btn" :class="{ active: showDimensions }" @click="showDimensions = !showDimensions">
            {{ showDimensions ? 'Hide' : 'Show' }} Dimensions
          </button>
          <button class="toggle-btn" :class="{ active: isStackedView }" @click="isStackedView = !isStackedView">
            {{ isStackedView ? 'Side-by-Side View' : 'Stacked View' }}
          </button>
          <div class="size-slider-group">
            <span class="size-label">Size</span>
            <button class="slider-btn" @click="decreaseSize">-</button>
            <input type="range" min="0" max="200" step="1" :value="sizePercent" @input="setSizePercent($event.target.value)" />
            <button class="slider-btn" @click="increaseSize">+</button>
            <span class="size-value">{{ sizePercent }}%</span>
          </div>
        </div>
      </div>
      <div class="toolbar-spacer" v-if="!isTableView"></div>
      <ComparisonShapesView
        v-if="!isTableView"
        :phoneData="phoneData"
        :selectedPhones="selectedPhones"
        :viewMode="viewMode"
        :scaleMode="scaleMode"
        :showDimensions="showDimensions"
        :colorMap="phoneColorMap"
        :isStackedView="isStackedView"
        :sizePercent="sizePercent"
      />
      <PhoneStatsTable v-else />
    </template>
  </div>
</template>

<script setup>
import { inject, reactive, watch, ref } from 'vue'
import ComparisonShapesView from './ComparisonShapesView.vue'
import PhoneStatsTable from './PhoneStatsTable.vue'

const props = defineProps({
  isTableView: Boolean
})

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
const isStackedView = ref(false)

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
.toolbar-row {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 900px;
}
.toolbar-left {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.toolbar-right {
  display: flex;
  align-items: center;
}
.view-toggle {
  font-weight: 600;
  background: #232a36;
  color: #4a9eff;
  border: 1px solid #4a9eff;
  border-radius: 6px;
  padding: 0.5em 1.2em;
  transition: background 0.18s, color 0.18s;
}
.view-toggle:hover {
  background: #4a9eff;
  color: #232a36;
}
.size-slider-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.size-label {
  color: #aaa;
  font-size: 0.97em;
  margin-right: 0.3em;
}
.slider-btn {
  background: #232a36;
  border: 1px solid #444;
  color: #fff;
  font-size: 1.1em;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.18s, border 0.18s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slider-btn:hover {
  background: #4a9eff;
  color: #222;
  border-color: #4a9eff;
}
input[type="range"] {
  width: 90px;
  accent-color: #4a9eff;
  background: #444;
  border-radius: 2px;
  height: 2px;
}
.size-value {
  color: #aaa;
  font-size: 0.97em;
  margin-left: 0.3em;
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
