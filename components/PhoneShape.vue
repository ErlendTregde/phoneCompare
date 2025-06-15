<template>
  <div class="phone-container">
    <PhoneInfoCard class="phone-info-card-outer" :phone="phone" :color="color" :onRemove="removePhone" />
    <svg class="phone-svg" :width="svgWidth" :height="svgHeight" :viewBox="`0 0 ${svgWidth} ${svgHeight}`" :style="{ color: color }" :class="colorClass">
      <!-- Side view -->
      <g v-if="view === 'side'" :transform="'translate(0, 0)'">
        <!-- Phone side outline -->
        <rect class="phone-outline" :x="sideX" :y="sideY" :width="phoneDepth" :height="phoneHeight" :rx="cornerRadius" :ry="cornerRadius" />
        <!-- Volume and power buttons -->
        <rect class="button" :x="sideX + phoneDepth - 3" :y="sideY + phoneHeight * 0.3" width="4" height="20" rx="2" ry="2" fill="#333"/>
        <rect class="button" :x="sideX + phoneDepth - 3" :y="sideY + phoneHeight * 0.5" width="4" height="20" rx="2" ry="2" fill="#333"/>
        <rect class="button" :x="sideX + phoneDepth - 3" :y="sideY + phoneHeight * 0.7" width="4" height="30" rx="2" ry="2" fill="#333"/>
        <g v-if="showDimensions">
          <!-- Height dimension -->
          <line class="dimension-line" :x1="sideX + phoneDepth + 10" :y1="sideY" :x2="sideX + phoneDepth + 10" :y2="sideY + phoneHeight" />
          <line class="dimension-line" :x1="sideX + phoneDepth + 5" :y1="sideY" :x2="sideX + phoneDepth + 15" :y2="sideY" />
          <line class="dimension-line" :x1="sideX + phoneDepth + 5" :y1="sideY + phoneHeight" :x2="sideX + phoneDepth + 15" :y2="sideY + phoneHeight" />
          <text class="dimension-text" :x="sideX + phoneDepth + 14" :y="sideY + phoneHeight / 2" text-anchor="start">{{ phone.dimensions.height_mm }}mm</text>
          <!-- Depth dimension -->
          <line class="dimension-line" :x1="sideX" :y1="sideY + phoneHeight + 10" :x2="sideX + phoneDepth" :y2="sideY + phoneHeight + 10" />
          <line class="dimension-line" :x1="sideX" :y1="sideY + phoneHeight + 5" :x2="sideX" :y2="sideY + phoneHeight + 15" />
          <line class="dimension-line" :x1="sideX + phoneDepth" :y1="sideY + phoneHeight + 5" :x2="sideX + phoneDepth" :y2="sideY + phoneHeight + 15" />
          <text class="dimension-text" :x="sideX + phoneDepth / 2" :y="sideY + phoneHeight + 28" text-anchor="middle">{{ phone.dimensions.depth_mm }}mm</text>
        </g>
      </g>
      <!-- Front view -->
      <g v-if="view === 'front'" :transform="'translate(0, 0)'">
        <rect class="phone-outline" :x="frontX" :y="frontY" :width="phoneWidth" :height="phoneHeight" :rx="cornerRadius" :ry="cornerRadius" />
        <rect class="screen" :x="frontX + 4" :y="frontY + 7" :width="screenWidth" :height="screenHeight" :rx="screenCornerRadius" :ry="screenCornerRadius"/>
        <g v-if="showDimensions">
          <!-- Height dimension -->
          <line class="dimension-line" :x1="frontX + phoneWidth + 10" :y1="frontY" :x2="frontX + phoneWidth + 10" :y2="frontY + phoneHeight" />
          <line class="dimension-line" :x1="frontX + phoneWidth + 5" :y1="frontY" :x2="frontX + phoneWidth + 15" :y2="frontY" />
          <line class="dimension-line" :x1="frontX + phoneWidth + 5" :y1="frontY + phoneHeight" :x2="frontX + phoneWidth + 15" :y2="frontY + phoneHeight" />
          <text class="dimension-text" :x="frontX + phoneWidth + 14" :y="frontY + phoneHeight / 2" text-anchor="start">{{ phone.dimensions.height_mm }}mm</text>
          <!-- Width dimension -->
          <line class="dimension-line" :x1="frontX" :y1="frontY + phoneHeight + 10" :x2="frontX + phoneWidth" :y2="frontY + phoneHeight + 10" />
          <line class="dimension-line" :x1="frontX" :y1="frontY + phoneHeight + 5" :x2="frontX" :y2="frontY + phoneHeight + 15" />
          <line class="dimension-line" :x1="frontX + phoneWidth" :y1="frontY + phoneHeight + 5" :x2="frontX + phoneWidth" :y2="frontY + phoneHeight + 15" />
          <text class="dimension-text" :x="frontX + phoneWidth / 2" :y="frontY + phoneHeight + 28" text-anchor="middle">{{ phone.dimensions.width_mm }}mm</text>
        </g>
      </g>
      <!-- Both view -->
      <g v-if="view === 'both'">
        <!-- Side view on left -->
        <g :transform="'translate(0, 0)'">
          <rect class="phone-outline" :x="sideX" :y="sideY" :width="phoneDepth" :height="phoneHeight" :rx="cornerRadius" :ry="cornerRadius" />
          <rect class="button" :x="sideX + phoneDepth - 3" :y="sideY + phoneHeight * 0.3" width="4" height="20" rx="2" ry="2" fill="#333"/>
          <rect class="button" :x="sideX + phoneDepth - 3" :y="sideY + phoneHeight * 0.5" width="4" height="20" rx="2" ry="2" fill="#333"/>
          <rect class="button" :x="sideX + phoneDepth - 3" :y="sideY + phoneHeight * 0.7" width="4" height="30" rx="2" ry="2" fill="#333"/>
          <g v-if="showDimensions">
            <!-- Height dimension for side -->
            <line class="dimension-line" :x1="sideX + phoneDepth + 10" :y1="sideY" :x2="sideX + phoneDepth + 10" :y2="sideY + phoneHeight" />
            <line class="dimension-line" :x1="sideX + phoneDepth + 5" :y1="sideY" :x2="sideX + phoneDepth + 15" :y2="sideY" />
            <line class="dimension-line" :x1="sideX + phoneDepth + 5" :y1="sideY + phoneHeight" :x2="sideX + phoneDepth + 15" :y2="sideY + phoneHeight" />
            <text class="dimension-text" :x="sideX + phoneDepth + 14" :y="sideY + phoneHeight / 2" text-anchor="start">{{ phone.dimensions.height_mm }}mm</text>
            <!-- Depth dimension for side -->
            <line class="dimension-line" :x1="sideX" :y1="sideY + phoneHeight + 10" :x2="sideX + phoneDepth" :y2="sideY + phoneHeight + 10" />
            <line class="dimension-line" :x1="sideX" :y1="sideY + phoneHeight + 5" :x2="sideX" :y2="sideY + phoneHeight + 15" />
            <line class="dimension-line" :x1="sideX + phoneDepth" :y1="sideY + phoneHeight + 5" :x2="sideX + phoneDepth" :y2="sideY + phoneHeight + 15" />
            <text class="dimension-text" :x="sideX + phoneDepth / 2" :y="sideY + phoneHeight + 28" text-anchor="middle">{{ phone.dimensions.depth_mm }}mm</text>
          </g>
        </g>
        <!-- Front view on right, spaced apart -->
        <g :transform="`translate(${sideX + phoneDepth + 40}, 0)`">
          <rect class="phone-outline" :x="frontX" :y="frontY" :width="phoneWidth" :height="phoneHeight" :rx="cornerRadius" :ry="cornerRadius" />
          <rect class="screen" :x="frontX + 4" :y="frontY + 7" :width="screenWidth" :height="screenHeight" :rx="screenCornerRadius" :ry="screenCornerRadius"/>
          <g v-if="showDimensions">
            <!-- Height dimension for front -->
            <line class="dimension-line" :x1="frontX + phoneWidth + 10" :y1="frontY" :x2="frontX + phoneWidth + 10" :y2="frontY + phoneHeight" />
            <line class="dimension-line" :x1="frontX + phoneWidth + 5" :y1="frontY" :x2="frontX + phoneWidth + 15" :y2="frontY" />
            <line class="dimension-line" :x1="frontX + phoneWidth + 5" :y1="frontY + phoneHeight" :x2="frontX + phoneWidth + 15" :y2="frontY + phoneHeight" />
            <text class="dimension-text" :x="frontX + phoneWidth + 14" :y="frontY + phoneHeight / 2" text-anchor="start">{{ phone.dimensions.height_mm }}mm</text>
            <!-- Width dimension for front -->
            <line class="dimension-line" :x1="frontX" :y1="frontY + phoneHeight + 10" :x2="frontX + phoneWidth" :y2="frontY + phoneHeight + 10" />
            <line class="dimension-line" :x1="frontX" :y1="frontY + phoneHeight + 5" :x2="frontX" :y2="frontY + phoneHeight + 15" />
            <line class="dimension-line" :x1="frontX + phoneWidth" :y1="frontY + phoneHeight + 5" :x2="frontX + phoneWidth" :y2="frontY + phoneHeight + 15" />
            <text class="dimension-text" :x="frontX + phoneWidth / 2" :y="frontY + phoneHeight + 28" text-anchor="middle">{{ phone.dimensions.width_mm }}mm</text>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import PhoneInfoCard from './PhoneInfoCard.vue'

const props = defineProps({
  phone: {
    type: Object,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  view: {
    type: String,
    default: 'both'
  },
  scale: {
    type: String,
    default: 'fit'
  },
  showDimensions: {
    type: Boolean,
    default: true
  }
})

const selectedPhones = inject('selectedPhones')
const sizePercent = inject('sizePercent')

const baseScale = computed(() => props.scale === 'actual' ? 2 : 1.5)
const scale = computed(() => baseScale.value * (sizePercent ? sizePercent.value / 100 : 1))
const phoneWidth = computed(() => props.phone.dimensions.width_mm * scale.value)
const phoneHeight = computed(() => props.phone.dimensions.height_mm * scale.value)
const phoneDepth = computed(() => props.phone.dimensions.depth_mm * scale.value)
const cornerRadius = computed(() => Math.min(phoneWidth.value, phoneHeight.value) * 0.15)
const screenCornerRadius = computed(() => Math.min(phoneWidth.value, phoneHeight.value) * 0.12)
const screenWidth = computed(() => phoneWidth.value - 8)
const screenHeight = computed(() => phoneHeight.value - 14)

// Restore previous margin for dimension labels
const labelMargin = 48
const sideX = labelMargin
const sideY = 8
const frontX = labelMargin
const frontY = 8

const extraMargin = 40; // extra space for dimension labels
const svgWidth = computed(() => {
  if (props.view === 'both') {
    return phoneDepth.value + phoneWidth.value + labelMargin * 2 + 40 + extraMargin; // 40px gap + extra margin
  }
  return props.view === 'side' ? phoneDepth.value + labelMargin * 2 + extraMargin : phoneWidth.value + labelMargin * 2 + extraMargin;
})
const svgHeight = computed(() => phoneHeight.value + 60)

const colorClass = computed(() => `color-${props.color}`)

function removePhone() {
  const idx = selectedPhones.indexOf(props.phone.slug)
  if (idx !== -1) {
    selectedPhones.splice(idx, 1)
  }
}
</script>

<style scoped>
.phone-container {
  position: relative;
  margin: 0 2rem;
  overflow: visible !important;
}

.phone-info {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  white-space: nowrap;
  z-index: 10;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  box-shadow: 0 2px 8px var(--shadow-color);
}

.phone-name {
  font-weight: bold;
  color: var(--text-primary) !important;
  text-shadow: none;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.remove-x {
  color: var(--text-tertiary);
  font-size: 1.2em;
  margin-left: 0.5em;
  cursor: pointer;
  transition: color 0.2s;
  opacity: 0.5;
}
.phone-name:hover .remove-x {
  color: #ff4a4a;
  opacity: 1;
}

.phone-specs {
  color: var(--text-tertiary);
  font-size: 0.8rem;
}

.phone-svg {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.phone-outline {
  fill: none;
  stroke: currentColor;
  stroke-width: 4;
}

.screen {
  fill: #000;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 1;
}

.button {
  stroke: rgba(0, 0, 0, 0.2);
  stroke-width: 1;
}

.dimension-line {
  stroke: currentColor;
  stroke-width: 1;
  stroke-dasharray: 2,2;
}

.dimension-text {
  fill: currentColor;
  font-size: 12px;
  font-family: monospace;
}

.comparison-area {
  overflow: visible !important;
}

.color-blue {
  color: #4a9eff;
}
.color-red {
  color: #ff4a4a;
}
.color-green {
  color: #4aff4a;
}
.color-yellow {
  color: #ffff4a;
}

.color-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
  /* border: 2px solid #fff; */
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  vertical-align: middle;
}
</style>
