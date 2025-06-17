<template>
  <div class="phone-stats-table-wrapper" v-if="selectedPhones.length">
    <div class="where-to-buy-row">
      <span class="where-label">Where to buy</span>
      <div class="buy-links">
        <template v-for="id in selectedPhones" :key="id">
          <a class="buy-btn" href="#" target="_blank">
            <span class="buy-icon">🛒</span>
            {{ phoneData[id].brand }}
          </a>
        </template>
      </div>
    </div>
    <table class="phone-stats-table">
      <thead>
        <tr>
          <th class="spec-header">Spec</th>
          <th v-for="id in selectedPhones" :key="id" class="phone-header">
            <div class="brand">{{ phoneData[id].brand }}</div>
            <div class="model">{{ phoneData[id].model }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.label" class="stats-row">
          <td class="spec-label">{{ row.label }}</td>
          <td v-for="id in selectedPhones" :key="id + '-' + row.key" class="spec-value">
            {{ row.value(phoneData[id]) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
const phoneData = inject('phoneData')
const selectedPhones = inject('selectedPhones')

const rows = computed(() => [
  { label: 'Height (mm)', key: 'height', value: p => p.dimensions.height_mm },
  { label: 'Width (mm)', key: 'width', value: p => p.dimensions.width_mm },
  { label: 'Depth (mm)', key: 'depth', value: p => p.dimensions.depth_mm },
  { label: 'Weight (g)', key: 'weight', value: p => p.dimensions.weight_g },
  { label: 'Display (inches)', key: 'display', value: p => p.display.size_inches },
  { label: 'Battery (mAh)', key: 'battery', value: p => p.battery.capacity_mah },
  { label: 'Release date', key: 'release', value: p => p.release_date },
])
</script>

<style scoped>
.phone-stats-table-wrapper {
  background: var(--card-bg);
  border-radius: 12px;
  overflow-x: auto;
  max-width: 900px;
  margin: 2rem auto 0 auto;
  box-shadow: 0 4px 20px var(--shadow-color);
  font-family: inherit;
  padding: 0.5rem 0.5rem 1.5rem 0.5rem;
  border: 1px solid var(--border-color);
  width: 100%;
}
.phone-stats-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.97em;
  color: var(--text-primary);
  background: transparent;
  min-width: 400px;
}
.spec-header {
  background: var(--section-bg);
  color: var(--text-tertiary);
  font-weight: 500;
  font-size: 0.98em;
  text-align: left;
  padding: 1em 1em 1em 0.5em;
  border-bottom: 1px solid var(--border-color);
}
.phone-header {
  background: var(--section-bg);
  font-weight: 600;
  font-size: 1em;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
  padding: 1em 1em 1em 1em;
  color: var(--text-primary) !important;
}
.brand {
  color: var(--text-primary) !important;
  font-size: 0.95em;
  font-weight: 500;
}
.model {
  color: var(--text-primary) !important;
  font-size: 1em;
  font-weight: 700;
  margin-top: 0.1em;
}
.stats-row {
  transition: background 0.15s;
}
.stats-row:hover {
  background: var(--hover-bg);
}
.spec-label {
  color: var(--text-tertiary);
  font-weight: 500;
  text-align: left;
  padding: 0.7em 1em 0.7em 0.5em;
  border-bottom: 1px solid var(--border-color);
  background: transparent;
}
.spec-value {
  text-align: center;
  font-weight: 500;
  padding: 0.7em 1em;
  border-bottom: 1px solid var(--border-color);
  background: transparent;
}
.where-to-buy-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.5rem 0 0.5rem;
}
.where-label {
  color: var(--text-secondary);
  font-size: 1.05em;
  min-width: 120px;
}
.buy-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.buy-btn {
  display: flex;
  align-items: center;
  background: #2476e6;
  color: #fff;
  border-radius: 10px;
  padding: 0.7em 1.5em;
  font-weight: 600;
  font-size: 1em;
  text-decoration: none;
  transition: background 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border: none;
  outline: none;
  cursor: pointer;
}
.buy-btn:hover {
  background: #1a5bb8;
}
.buy-icon {
  margin-right: 0.7em;
  font-size: 1.2em;
}
@media (max-width: 900px) {
  .phone-stats-table-wrapper {
    max-width: 100vw;
    width: 100vw;
    border-radius: 0;
    margin: 1rem 0 0 0;
    padding: 0.2rem 0 1rem 0;
    overflow-x: auto;
  }
  .phone-stats-table {
    min-width: 480px;
    width: max-content;
  }
}
@media (max-width: 700px) {
  .phone-stats-table th, .phone-stats-table td {
    padding: 0.5em 0.3em;
    font-size: 0.92em;
  }
  .phone-stats-table-wrapper {
    padding: 0.2rem 0.1rem 1rem 0.1rem;
    max-width: 100vw;
    width: 100vw;
  }
  .where-to-buy-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7rem;
    padding: 0.5rem 0.1rem 0 0.1rem;
  }
  .buy-links {
    gap: 0.5rem;
  }
}
</style> 