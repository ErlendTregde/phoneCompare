<template>
    <div class="controls">
        <div class="control-group">
            <label class="control-label">View</label>
            <button class="toggle-btn" :class="{ active: viewMode === 'front' }"
                @click="viewMode = 'front'">Front</button>
            <button class="toggle-btn" :class="{ active: viewMode === 'side' }" @click="viewMode = 'side'">Side</button>
            <button class="toggle-btn" :class="{ active: viewMode === 'both' }" @click="viewMode = 'both'">Both</button>
        </div>
        <div class="control-group">
            <label class="control-label">Dimensions</label>
            <button class="toggle-btn" :class="{ active: showDimensions }" @click="showDimensions = !showDimensions">
                {{ showDimensions ? 'Hide' : 'Show' }}
            </button>
        </div>
        <div class="control-group size-slider-group">
            <label class="control-label">Size <span class="size-value">{{ sizePercent }}%</span></label>
            <div class="slider-row">
                <button class="slider-btn" @click="decreaseSize">-</button>
                <input type="range" min="50" max="150" step="1" v-model.number="sizePercent" @input="onSlider" />
                <button class="slider-btn" @click="increaseSize">+</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue'
const viewMode = inject('viewMode')
const showDimensions = inject('showDimensions')
const sizePercent = inject('sizePercent')
const setSizePercent = inject('setSizePercent')
const increaseSize = inject('increaseSize')
const decreaseSize = inject('decreaseSize')
function onSlider(e) {
    setSizePercent(Number(e.target.value))
}
</script>

<style scoped>
.controls {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.8);
    padding: 1rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
    min-width: 200px;
    z-index: 10;
    width: clamp(200px, 90vw, 300px);
}

.control-group {
    margin-bottom: 1rem;
}

.control-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    color: #ccc;
}

.toggle-btn {
    background: #3a3a3a;
    border: 1px solid #555;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 0.5rem;
    min-height: 48px;
    min-width: 48px;
    font-size: clamp(0.8rem, 2vw, 1rem);
}

.toggle-btn.active {
    background: #4a9eff;
    border-color: #4a9eff;
}

@media (max-width: 900px) {
    .controls {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: auto;
        transform: none;
        margin: 0;
        border-radius: 8px 8px 0 0;
        width: 100%;
        min-width: 100%;
    }

    .control-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
    }

    .control-label {
        margin-bottom: 0;
        margin-right: 0.5rem;
    }
}

.size-slider-group {
    margin-top: 2rem;
}

.slider-row {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

.slider-btn {
    background: none;
    border: none;
    color: #fff;
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    width: 2em;
    height: 2em;
    min-width: 48px;
    min-height: 48px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s;
}

.slider-btn:hover {
    background: #333;
}

input[type="range"] {
    flex: 1 1 0;
    accent-color: #aaa;
    height: 2px;
    background: #444;
    border-radius: 2px;
    min-height: 48px;
}

.size-value {
    color: #aaa;
    font-size: clamp(0.85rem, 2vw, 0.95rem);
    margin-left: 0.5em;
}
</style>
