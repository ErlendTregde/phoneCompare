<template>
  <NuxtLayout>
    <SearchBar />
    <ComparisonArea />
  </NuxtLayout>
</template>

<script setup>
import { provide } from 'vue'
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
