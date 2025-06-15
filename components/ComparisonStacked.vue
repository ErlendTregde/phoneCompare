<template>
  <div class="stacked-main">
    <!-- Left: Stacked Outlines -->
    <div class="stacked-svg-col">
      <svg :width="svgWidth" :height="svgHeight + 40" style="display: block; margin: 0 auto; position: relative;">
        <g v-for="id in selectedPhones" :key="id">
          <rect
            v-if="phoneData[id]"
            :x="outlineX"
            :y="outlineY"
            :width="getWidth(phoneData[id])"
            :height="getHeight(phoneData[id])"
            :rx="getCornerRadius(phoneData[id])"
            :ry="getCornerRadius(phoneData[id])"
            :stroke="colorMap[id] || '#4a9eff'"
            fill="none"
            stroke-width="3"
            opacity="0.85"
          />
        </g>
        <!-- Only show dimensions for the largest phone -->
        <g v-if="showDimensions && largestPhoneId && phoneData[largestPhoneId]">
          <line
            :x1="outlineX + getWidth(phoneData[largestPhoneId]) + 10"
            :y1="outlineY"
            :x2="outlineX + getWidth(phoneData[largestPhoneId]) + 10"
            :y2="outlineY + getHeight(phoneData[largestPhoneId])"
            stroke="#4a9eff"
            stroke-width="1"
            stroke-dasharray="2,2"
          />
          <text
            :x="outlineX + getWidth(phoneData[largestPhoneId]) + 14"
            :y="outlineY + getHeight(phoneData[largestPhoneId]) / 2"
            fill="#4a9eff"
            font-size="12"
            text-anchor="start"
            alignment-baseline="middle"
            font-family="monospace"
          >
            {{ phoneData[largestPhoneId].dimensions.height_mm }}mm
          </text>
          <line
            :x1="outlineX"
            :y1="outlineY + getHeight(phoneData[largestPhoneId]) + 18"
            :x2="outlineX + getWidth(phoneData[largestPhoneId])"
            :y2="outlineY + getHeight(phoneData[largestPhoneId]) + 18"
            stroke="#4a9eff"
            stroke-width="1"
            stroke-dasharray="2,2"
          />
          <text
            :x="outlineX + getWidth(phoneData[largestPhoneId]) / 2"
            :y="outlineY + getHeight(phoneData[largestPhoneId]) + 32"
            fill="#4a9eff"
            font-size="12"
            text-anchor="middle"
            alignment-baseline="middle"
            font-family="monospace"
          >
            {{ phoneData[largestPhoneId].dimensions.width_mm }}mm
          </text>
        </g>
      </svg>
    </div>
    <!-- Right: Phone Info Table -->
    <div class="stacked-info-col">
      <div v-if="!selectedPhonesWithData.length" class="phone-info-card debug">
        No phones selected.
      </div>
      <div v-for="id in selectedPhonesWithData" :key="id" class="phone-info-card-wrapper">
        <PhoneInfoCard :phone="phoneData[id]" :color="colorMap[id] || '#4a9eff'" :onRemove="() => removePhone(id)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import PhoneInfoCard from './PhoneInfoCard.vue'

const props = defineProps({
  phoneData: Object,
  selectedPhones: Array,
  colorMap: Object,
  sizePercent: Number,
  showDimensions: {
    type: Boolean,
    default: true
  }
})

const selectedPhones = inject('selectedPhones')

const baseScale = 1.5
const scale = computed(() => baseScale * (props.sizePercent ? props.sizePercent / 100 : 1))

const outlineX = 48
const outlineY = 8

function getWidth(phone) {
  return phone.dimensions.width_mm * scale.value
}

function getHeight(phone) {
  return phone.dimensions.height_mm * scale.value
}

function getCornerRadius(phone) {
  return Math.min(getWidth(phone), getHeight(phone)) * 0.15
}

// Find the phone with the largest width and height
const largestPhoneId = computed(() => {
  let maxArea = 0
  let maxId = null
  for (const id of props.selectedPhones) {
    const phone = props.phoneData[id]
    if (phone) {
      const area = getWidth(phone) * getHeight(phone)
      if (area > maxArea) {
        maxArea = area
        maxId = id
      }
    }
  }
  return maxId
})

const svgWidth = computed(() => {
  const maxWidth = Math.max(...props.selectedPhones.map(id => 
    props.phoneData[id] ? getWidth(props.phoneData[id]) : 0
  ))
  return maxWidth + 96 // 48px margin on each side
})

const svgHeight = computed(() => {
  const maxHeight = Math.max(...props.selectedPhones.map(id => 
    props.phoneData[id] ? getHeight(props.phoneData[id]) : 0
  ))
  return maxHeight + 60
})

const selectedPhonesWithData = computed(() =>
  props.selectedPhones.filter(id => props.phoneData[id])
)

function removePhone(id) {
  const idx = selectedPhones.indexOf(id)
  if (idx !== -1) {
    selectedPhones.splice(idx, 1)
  }
}
</script>

<style scoped>
.stacked-main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  min-height: 480px;
  box-sizing: border-box;
}
.stacked-svg-col {
  flex: 1 1 0;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 1.5rem;
}
.stacked-info-col {
  flex: 1 1 0;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1.2rem;
  padding-left: 1.5rem;
}
.phone-info-card-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.phone-info-card.debug {
  border: 2px dashed #ff4a4a !important;
}
@media (max-width: 900px) {
  .stacked-main {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    max-width: 98vw;
  }
  .stacked-svg-col, .stacked-info-col {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    padding: 0;
  }
  .stacked-info-col {
    align-items: center;
  }
  .phone-info-card-wrapper {
    margin-left: auto;
    margin-right: auto;
  }
}
</style> 