import { ref, reactive, watch, onMounted } from 'vue'
import phones from '@/public/data/phones.json'

export default function usePhoneComparisonState() {
  // Shared state
  const phoneData = phones.reduce((acc, phone) => {
    acc[phone.slug] = phone;
    return acc;
  }, {})
  const defaultPhones = ['samsung_galaxy_s24_ultra']
  // Always use default on SSR
  const selectedPhones = reactive([...defaultPhones])

  // On client, update from localStorage after hydration
  onMounted(() => {
    const saved = localStorage.getItem('selectedPhones')
    if (saved) {
      selectedPhones.splice(0, selectedPhones.length, ...JSON.parse(saved))
    }
    watch(selectedPhones, (val) => {
      localStorage.setItem('selectedPhones', JSON.stringify([...val]))
    }, { deep: true })
  })

  const viewMode = ref('both')
  const scaleMode = ref('fit')
  const showDimensions = ref(true)
  const sizePercent = ref(100)
  const isStacked = ref(false)
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
    decreaseSize,
    isStacked
  }
} 