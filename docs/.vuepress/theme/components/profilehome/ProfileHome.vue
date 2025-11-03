<template>
  <div class="home-container">
    <canvas ref="canvasRef" />
    <div class="profile-container">
      <router-link class="avatar-link" to="/blog/">
        <img ref="avatarRef" src="/avatar.jpg" alt="Hoey" class="profile-avatar" @mousemove="handleAvatarMouseMove"
          @mouseleave="handleAvatarMouseLeave" />
      </router-link>
      <div class="profile-name">Hoey</div>
      <div class="profile-slogan">Teacher, I'm on fire to improve!</div>
      <div class="profile-links-box">
        <a href="https://github.com/zhenghaoyang24" target="_blank" class="profile-links">
          <icon class="profile-icon" name="grommet-icons:github" />
        </a>
        <a href="mailto:zhenghaoyang24@foxmail.com" target="_blank" class="profile-links">
          <icon class="profile-icon" name="streamline-flex:mail-send-email-message-circle-solid" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, type HTMLAttributes } from "vue";

interface Props {
  hue?: number;
  saturation?: number;
  chroma?: number;
  class?: HTMLAttributes["class"];
}

// 色相 HSV
const props = withDefaults(defineProps<Props>(), {
  hue: 0,
  saturation: 0,
  chroma: 0.6,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
let gl: WebGLRenderingContext | null = null;
let program: WebGLProgram | null = null;
let animationId: number | null = null;

const pointer = {
  x: 0,
  y: 0,
  tX: 0,
  tY: 0,
};

// Shaders
const vertexShaderSource = `
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

const fragmentShaderSource = `
    precision mediump float;
    varying vec2 vUv;
    uniform float u_time;
    uniform float u_ratio;
    uniform vec2 u_pointer_position;
    uniform float u_scroll_progress;
    uniform float u_hue;
    uniform float u_saturation;
    uniform float u_chroma;
  
    vec2 rotate(vec2 uv, float th) {
      return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
    }
  
    float neuro_shape(vec2 uv, float t, float p) {
      vec2 sine_acc = vec2(0.);
      vec2 res = vec2(0.);
      float scale = 8.;
      for (int j = 0; j < 15; j++) {
        uv = rotate(uv, 1.);
        sine_acc = rotate(sine_acc, 1.);
        vec2 layer = uv * scale + float(j) + sine_acc - t;
        sine_acc += sin(layer) + 2.4 * p;
        res += (.5 + .5 * cos(layer)) / scale;
        scale *= 1.2;
      }
      return res.x + res.y;
    }
  
    vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
      return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
    }
  
    void main() {
      vec2 uv = vUv * 0.5;
      uv.x *= u_ratio;
  
      vec2 pointer = vUv - u_pointer_position;
      pointer.x *= u_ratio;
      float p = clamp(length(pointer), 0.0, 1.0);
      p = 0.5 * pow(1.0 - p, 2.0);
  
      float t = 0.001 * u_time;
      float noise = neuro_shape(uv, t, p);
      noise = 1.2 * pow(noise, 3.0);
      noise += pow(noise, 10.0);
      noise = max(0.0, noise - 0.5);
      noise *= (1.0 - length(vUv - 0.5));
  
      float normalizedHue = u_hue / 360.0;
      vec3 hsl = vec3(
        normalizedHue + 0.1 * sin(3.0 * u_scroll_progress + 1.5),
        u_saturation,
        u_chroma * 0.5 + 0.2 * sin(2.0 * u_scroll_progress)
      );
      vec3 color = hsl2rgb(hsl) * noise;
  
      gl_FragColor = vec4(color, noise);
    }
  `;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vs: WebGLShader,
  fs: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function initWebGL() {
  const canvas = canvasRef.value;
  if (!canvas) return false;

  gl = (canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
  if (!gl) {
    console.error("WebGL not supported");
    return false;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vs || !fs) return false;

  program = createProgram(gl, vs, fs);
  if (!program) return false;

  gl.useProgram(program);

  // Fullscreen quad
  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
  const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
  const indices = new Uint16Array([0, 1, 2, 3]);

  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
  const uvLoc = gl.getAttribLocation(program, "uv");
  gl.enableVertexAttribArray(uvLoc);
  gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  resize();

  return true;
}

function resize() {
  if (!gl || !canvasRef.value) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Set actual drawing buffer
  canvasRef.value.width = width * dpr;
  canvasRef.value.height = height * dpr;

  gl.viewport(0, 0, width * dpr, height * dpr);
}

function render(time: number) {
  if (!gl || !program) return;

  pointer.x += (pointer.tX - pointer.x) * 0.2;
  pointer.y += (pointer.tY - pointer.y) * 0.2;

  const ratio = window.innerWidth / window.innerHeight;

  const setUniform = (name: string, value: any) => {
    const loc = gl!.getUniformLocation(program!, name);
    if (!loc) return;
    if (typeof value === "number") {
      gl!.uniform1f(loc, value);
    } else if (Array.isArray(value) && value.length === 2) {
      gl!.uniform2f(loc, value[0], value[1]);
    }
  };

  setUniform("u_time", time);
  setUniform("u_ratio", ratio);
  setUniform("u_pointer_position", [
    pointer.x / window.innerWidth,
    1 - pointer.y / window.innerHeight,
  ]);
  setUniform(
    "u_scroll_progress",
    window.pageYOffset / (2 * window.innerHeight)
  );
  setUniform("u_hue", props.hue);
  setUniform("u_saturation", props.saturation);
  setUniform("u_chroma", props.chroma);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLE_STRIP, 4, gl.UNSIGNED_SHORT, 0);

  animationId = requestAnimationFrame(render);
}

const updatePointer = (x: number, y: number) => {
  pointer.tX = x;
  pointer.tY = y;
};

const handlePointerMove = (e: PointerEvent) =>
  updatePointer(e.clientX, e.clientY);
const handleTouchMove = (e: TouchEvent) => {
  if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
};
const handleClick = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);

watch(
  () => props.hue,
  () => { }
);
watch(
  () => props.saturation,
  () => { }
);
watch(
  () => props.chroma,
  () => { }
);

onMounted(() => {
  if (initWebGL()) {
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("click", handleClick);
    animationId = requestAnimationFrame(render);
  }
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener("resize", resize);
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("touchmove", handleTouchMove);
  window.removeEventListener("click", handleClick);
  gl = null;
  program = null;
});

// 按压效果

const avatarRef = ref<HTMLImageElement | null>(null);

const handleAvatarMouseMove = (e: MouseEvent) => {
  if (!avatarRef.value) return;

  const rect = avatarRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const offsetX = (e.clientX - centerX) / (rect.width / 2);
  const offsetY = (e.clientY - centerY) / (rect.height / 2);

  const nx = Math.max(-1, Math.min(1, offsetX));
  const ny = Math.max(-1, Math.min(1, offsetY));

  const rotateY = -nx * 10;
  const rotateX = ny * 10;

  avatarRef.value.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleAvatarMouseLeave = () => {
  if (!avatarRef.value) return;
  avatarRef.value.style.transition = "transform 0.2s ease-out";
  avatarRef.value.style.transform = "perspective(500px) rotateX(0) rotateY(0)";
};
</script>

<style scoped>
:root {
  --pofile-card-bg: #f3f3f3;
}

[data-theme="dark"] {
  --pofile-card-bg: #f3f3f377;
}

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 140px);
  margin: 0;
  padding: 0;
  z-index: -1;
  overflow: hidden;
}

canvas {
  z-index: -1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
}

.profile-container {
  border-radius: 10px;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 26px;
  background-color: #8f8f8f49;
  backdrop-filter: blur(10px);
}

.avatar-link {
  pointer-events: none;
  display: contents;
}

.profile-avatar {
  width: 260px;
  height: 260px;
  border-radius: 10px;
  box-shadow: 0 0 10px #00000077;
  pointer-events: auto;
  transition: transform 0.2s ease-out;
}

.profile-name {
  font-weight: bold;
  padding: 16px 0;
  font-size: 24px;
}

.profile-links-box {
  margin: 12px 0;
  display: flex;
}

.profile-links {
  font-size: 30px;
}
</style>
