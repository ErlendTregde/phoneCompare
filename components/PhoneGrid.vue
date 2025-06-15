<template>
    <div class="phone-grid">
        <div v-for="(phone, id) in phoneData" :key="id" class="phone-card"
            :class="{ selected: selectedPhones.includes(id) }" @click="togglePhone(id)">
            <h3>{{ phone.brand }} {{ phone.model }}</h3>
            <p>{{ phone.dimensions.height_mm }} × {{ phone.dimensions.width_mm }} × {{ phone.dimensions.depth_mm }} mm</p>
            <p>{{ phone.dimensions.weight_g }}g • {{ phone.display.size_inches }}" display</p>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'

const phoneData = inject('phoneData')
const selectedPhones = inject('selectedPhones')

function togglePhone(id) {
    const index = selectedPhones.indexOf(id)
    if (index !== -1) {
        selectedPhones.splice(index, 1)
    } else if (selectedPhones.length < 3) {
        selectedPhones.push(id)
    }
}
</script>

<style scoped>
.phone-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.phone-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--text-primary);
}

.phone-card:hover {
    border-color: var(--accent-color);
    transform: translateY(-2px);
}

.phone-card.selected {
    border-color: var(--accent-color);
    background: rgba(74, 158, 255, 0.08);
}

.phone-card h3 {
    margin: 0 0 0.5rem 0;
    color: var(--accent-color);
}

.phone-card p {
    margin: 0.25rem 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
}
</style>