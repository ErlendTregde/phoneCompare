<template>
  <div class="container three-d-view">
    <SearchBar>
      <template #after-input>
        <!-- You can add extra controls here if needed -->
      </template>
    </SearchBar>
    <div class="phone-3d-columns">
      <div v-for="phone in selectedPhonesList" :key="phone.slug" class="phone-3d-col">
        <PhoneInfoCard
          :phone="phone"
          :color="getColor(phone)"
          :onRemove="() => removePhone(phone.slug)"
        />
        <Phone3DBox
          :width="phone.dimensions.width_mm"
          :height="phone.dimensions.height_mm"
          :depth="phone.dimensions.depth_mm"
          :color="getColor(phone)"
          :label="phone.brand + ' ' + phone.model"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { provide, computed } from 'vue'
import usePhoneComparisonState from '@/composables/usePhoneComparisonState'
import Phone3DBox from '@/components/Phone3DBox.vue'
import PhoneInfoCard from '@/components/PhoneInfoCard.vue'
import SearchBar from '@/components/SearchBar.vue'

const { selectedPhones, phoneData } = usePhoneComparisonState()

// Provide state for SearchBar and children
provide('phoneData', phoneData)
provide('selectedPhones', selectedPhones)

const selectedPhonesList = computed(() => selectedPhones.map(slug => phoneData[slug]).filter(Boolean))

function getColor(phone) {
  // Assign a color based on brand or slug for visual distinction
  const colorMap = {
    Samsung: 'var(--accent-color)',
    Huawei: '#e53935',
    Apple: '#333',
    Xiaomi: '#ff9800',
    default: 'var(--button-border)'
  }
  return colorMap[phone.brand] || colorMap.default
}

function removePhone(slug) {
  const idx = selectedPhones.indexOf(slug)
  if (idx !== -1) selectedPhones.splice(idx, 1)
}
</script>

<style scoped>
.three-d-view {
  padding: 2rem 0 3rem 0;
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color);
}
.phone-3d-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-end;
}
.phone-3d-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 220px;
  max-width: 340px;
}
@media (max-width: 900px) {
  .phone-3d-columns {
    gap: 1rem;
  }
}
@media (max-width: 600px) {
  .phone-3d-columns {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .phone-3d-col {
    min-width: 0;
    width: 100%;
    max-width: 100vw;
  }
}
</style> 