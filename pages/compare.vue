<template>
  <SearchBar>
    <template #after-input>
      <button class="toggle-btn view-toggle" @click="isTableView = !isTableView">
        {{ isTableView ? 'Show Shapes' : 'Show Table' }}
      </button>
    </template>
  </SearchBar>
  <ComparisonArea :isTableView="isTableView" />
</template>

<script setup>
import { provide, ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import ComparisonArea from '@/components/ComparisonArea.vue'
import usePhoneComparisonState from '@/composables/usePhoneComparisonState'
import useTheme from '@/composables/useTheme'

const {
  phoneData,
  selectedPhones,
  viewMode,
  scaleMode,
  showDimensions,
  sizePercent,
  setSizePercent,
  increaseSize,
  decreaseSize
} = usePhoneComparisonState()

const { isDark } = useTheme()

const isTableView = ref(false)

provide('phoneData', phoneData)
provide('selectedPhones', selectedPhones)
provide('viewMode', viewMode)
provide('scaleMode', scaleMode)
provide('showDimensions', showDimensions)
provide('sizePercent', sizePercent)
provide('setSizePercent', setSizePercent)
provide('increaseSize', increaseSize)
provide('decreaseSize', decreaseSize)
provide('isDark', isDark)
</script> 