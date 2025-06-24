<template>
  <div class="phone-3d-box">
    <canvas ref="canvasRef" :aria-label="label" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  width: { type: Number, required: true }, // in mm
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
  color: { type: String, default: '#2196f3' },
  label: { type: String, default: '' }
})

function resolveCssVar(color) {
  if (!color) return '#4a9eff';
  if (color.startsWith('var(')) {
    const varName = color.match(/var\((--[^)]+)\)/)?.[1];
    if (varName && typeof window !== 'undefined') {
      const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      return value || '#4a9eff';
    }
    return '#4a9eff';
  }
  return color;
}

const canvasRef = ref(null)
let renderer, scene, camera, box, animationId
let isDragging = false
let lastX = 0, lastY = 0

const scale = 0.1 // mm to cm

function setupScene() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
  camera.position.set(0, 0, 30)
  scene.add(camera)

  const geometry = new THREE.BoxGeometry(props.width * scale, props.height * scale, props.depth * scale)
  const material = new THREE.MeshPhongMaterial({ color: resolveCssVar(props.color), wireframe: false })
  box = new THREE.Mesh(geometry, material)
  scene.add(box)

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(10, 20, 20)
  scene.add(light)
  scene.add(new THREE.AmbientLight(0xffffff, 0.5))
}

function animate() {
  animationId = requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

function resizeRenderer() {
  if (!renderer || !canvasRef.value) return
  const size = canvasRef.value.parentElement.getBoundingClientRect()
  renderer.setSize(size.width, size.width * 1.2, false)
  camera.aspect = size.width / (size.width * 1.2)
  camera.updateProjectionMatrix()
}

function onPointerDown(event) {
  isDragging = true
  lastX = event.clientX
  lastY = event.clientY
}
function onPointerMove(event) {
  if (!isDragging) return
  const deltaX = event.clientX - lastX
  const deltaY = event.clientY - lastY
  lastX = event.clientX
  lastY = event.clientY
  if (box) {
    box.rotation.y += deltaX * 0.01
    box.rotation.x += deltaY * 0.01
  }
}
function onPointerUp() {
  isDragging = false
}

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true })
  setupScene()
  resizeRenderer()
  animate()
  window.addEventListener('resize', resizeRenderer)
  canvasRef.value.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  renderer.dispose()
  window.removeEventListener('resize', resizeRenderer)
  canvasRef.value.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})

watch(() => [props.width, props.height, props.depth, props.color], () => {
  // For extensibility: re-create box if props change
  if (box) scene.remove(box)
  const geometry = new THREE.BoxGeometry(props.width * scale, props.height * scale, props.depth * scale)
  const material = new THREE.MeshPhongMaterial({ color: resolveCssVar(props.color), wireframe: false })
  box = new THREE.Mesh(geometry, material)
  scene.add(box)
})
</script>

<style scoped>
.phone-3d-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}
canvas {
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 1/1.2;
  background: transparent;
  /* Removed border-radius and box-shadow for no border */
}
</style> 