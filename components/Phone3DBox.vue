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

const canvasRef = ref(null)
let renderer, scene, camera, box, animationId

const scale = 0.1 // mm to cm

function setupScene() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
  camera.position.set(0, 0, 30)
  scene.add(camera)

  const geometry = new THREE.BoxGeometry(props.width * scale, props.height * scale, props.depth * scale)
  const material = new THREE.MeshPhongMaterial({ color: props.color, wireframe: false })
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
  box.rotation.y += 0.01
  box.rotation.x += 0.005
  renderer.render(scene, camera)
}

function resizeRenderer() {
  if (!renderer || !canvasRef.value) return
  const size = canvasRef.value.parentElement.getBoundingClientRect()
  renderer.setSize(size.width, size.width * 1.2, false)
  camera.aspect = size.width / (size.width * 1.2)
  camera.updateProjectionMatrix()
}

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true })
  setupScene()
  resizeRenderer()
  animate()
  window.addEventListener('resize', resizeRenderer)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  renderer.dispose()
  window.removeEventListener('resize', resizeRenderer)
})

watch(() => [props.width, props.height, props.depth, props.color], () => {
  // For extensibility: re-create box if props change
  if (box) scene.remove(box)
  const geometry = new THREE.BoxGeometry(props.width * scale, props.height * scale, props.depth * scale)
  const material = new THREE.MeshPhongMaterial({ color: props.color, wireframe: false })
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