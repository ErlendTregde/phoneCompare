import { ref, reactive, watch } from 'vue'
import phones from '@/public/data/phones.json'

export default function usePhoneComparisonState() {
  // Shared state
  const phoneData = phones.reduce((acc, phone) => {
    acc[phone.slug] = phone;
    return acc;
  }, {})
  const defaultPhones = ['samsung_galaxy_s24_ultra']
  const saved = typeof window !== 'undefined' ? localStorage.getItem('selectedPhones') : null
  const selectedPhones = reactive(saved ? JSON.parse(saved) : defaultPhones)

  watch(selectedPhones, (val) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedPhones', JSON.stringify([...val]))
    }
  }, { deep: true })

  const viewMode = ref('both')
  const scaleMode = ref('fit')
  const showDimensions = ref(true)
  const sizePercent = ref(100)
  function setSizePercent(val) {
    sizePercent.value = Math.max(50, Math.min(150, val))
  }
  function increaseSize() { setSizePercent(sizePercent.value + 5) }
  function decreaseSize() { setSizePercent(sizePercent.value - 5) }

  return {
    phoneData,
    selectedPhones,
    viewMode,
    scaleMode,
    showDimensions,
    sizePercent,
    setSizePercent,
    increaseSize,
    decreaseSize
  }
} 