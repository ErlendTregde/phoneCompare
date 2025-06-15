<template>
    <div class="search-bar">
        <input type="text" class="search-input" placeholder="Add phone to comparison" v-model="searchQuery"
            @focus="showDropdown = true"
            @input="onInput"
            @keydown.esc="showDropdown = false"
            @keydown.down.prevent="moveFocus(1)"
            @keydown.up.prevent="moveFocus(-1)"
            @keydown.enter.prevent="selectFocused()"
            @blur="onBlur"
            autocomplete="off" />
        <div v-if="showDropdown" class="dropdown">
            <div
                v-for="([id, phone], idx) in filteredPhones"
                :key="id"
                class="dropdown-item"
                :class="{ focused: focusedIndex === idx }"
                @mousedown.prevent="togglePhone(id)"
                @mouseenter="hoveredId = id; focusedIndex = idx"
                @mouseleave="hoveredId = null; focusedIndex = -1"
            >
                <span>{{ phone.brand }} {{ phone.model }}</span>
                <span class="icon" v-if="selectedPhones.includes(id)">
                    <template v-if="hoveredId === id || focusedIndex === idx">✖</template>
                    <template v-else>✔</template>
                </span>
            </div>
            <div v-if="filteredPhones.length === 0" class="dropdown-item empty">No results</div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';

const searchQuery = ref('');
const showDropdown = ref(false);
const hoveredId = ref(null);
const focusedIndex = ref(-1);
const phoneData = inject('phoneData');
const selectedPhones = inject('selectedPhones');

const filteredPhones = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    const all = Object.entries(phoneData);
    if (!query) return all;
    return all.filter(([_id, phone]) =>
        `${phone.brand} ${phone.model}`.toLowerCase().includes(query)
    );
});

function togglePhone(id) {
    const idx = selectedPhones.indexOf(id);
    if (idx !== -1) {
        selectedPhones.splice(idx, 1);
    } else if (selectedPhones.length < 6) {
        selectedPhones.push(id);
    }
}

function onInput() {
    showDropdown.value = true;
    focusedIndex.value = -1;
}

function onBlur() {
    setTimeout(() => {
        showDropdown.value = false;
        focusedIndex.value = -1;
        hoveredId.value = null;
    }, 120);
}

function moveFocus(dir) {
    if (!showDropdown.value || filteredPhones.value.length === 0) return;
    if (focusedIndex.value === -1 && dir === 1) {
        focusedIndex.value = 0;
    } else if (focusedIndex.value === -1 && dir === -1) {
        focusedIndex.value = filteredPhones.value.length - 1;
    } else {
        focusedIndex.value = (focusedIndex.value + dir + filteredPhones.value.length) % filteredPhones.value.length;
    }
    if (focusedIndex.value >= 0 && focusedIndex.value < filteredPhones.value.length) {
        hoveredId.value = filteredPhones.value[focusedIndex.value][0];
    } else {
        hoveredId.value = null;
    }
}

function selectFocused() {
    if (focusedIndex.value >= 0 && focusedIndex.value < filteredPhones.value.length) {
        const [id] = filteredPhones.value[focusedIndex.value];
        togglePhone(id);
    }
}
</script>

<style scoped>
.search-bar {
    position: relative;
    margin: 2rem auto 2.2rem auto;
    width: 90%;
    max-width: 600px;
}

.search-input {
    width: 100%;
    padding: 1rem;
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 1rem;
    transition: background 0.2s, color 0.2s;
}

.search-input::placeholder {
    color: var(--text-tertiary);
}

.dropdown {
    position: absolute;
    left: 0;
    right: 0;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin-top: 0.25rem;
    z-index: 100;
    max-height: 320px;
    overflow-y: auto;
    box-shadow: 0 4px 16px var(--shadow-color);
    /* Custom scrollbar */
    scrollbar-width: thin;
    scrollbar-color: var(--accent-color) var(--section-bg);
}
.dropdown::-webkit-scrollbar {
    width: 8px;
    background: var(--section-bg);
    border-radius: 8px;
}
.dropdown::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 8px;
}
.dropdown::-webkit-scrollbar-thumb:hover {
    background: #2176bd;
}

.dropdown-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: var(--text-primary);
    font-size: 1rem;
    border-bottom: 1px solid var(--border-color);
    transition: background 0.15s;
    background: transparent;
}

.dropdown-item:last-child {
    border-bottom: none;
}

.dropdown-item:hover, .dropdown-item.focused {
    background: var(--hover-bg);
}

.dropdown-item.empty {
    color: var(--text-tertiary);
    cursor: default;
    justify-content: center;
}

.icon {
    font-size: 1.2em;
    margin-left: 1em;
    color: var(--accent-color);
    transition: color 0.2s;
}

.dropdown-item:hover .icon, .dropdown-item.focused .icon {
    color: #ff4a4a;
}
</style>