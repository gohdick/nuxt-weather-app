<template>
  <div class="weather-animation-container">
    <!-- Rain animation -->
    <div v-if="animationType === 'weather-rain'" class="rain-container">
      <div v-for="i in 20" :key="i" class="rain-drop" :style="{ 
        left: `${Math.random() * 100}%`, 
        animationDuration: `${0.7 + Math.random() * 0.3}s`,
        animationDelay: `${Math.random() * 2}s`
      }"></div>
    </div>

    <!-- Drizzle animation -->
    <div v-if="animationType === 'weather-drizzle'" class="drizzle-container">
      <div v-for="i in 15" :key="i" class="drizzle-drop" :style="{ 
        left: `${Math.random() * 100}%`, 
        animationDuration: `${0.9 + Math.random() * 0.4}s`,
        animationDelay: `${Math.random() * 2}s`
      }"></div>
    </div>

    <!-- Snow animation -->
    <div v-if="animationType === 'weather-snow'" class="snow-container">
      <div v-for="i in 30" :key="i" class="snowflake" :style="{ 
        left: `${Math.random() * 100}%`, 
        animationDuration: `${3 + Math.random() * 7}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: 0.4 + Math.random() * 0.6,
        width: `${3 + Math.random() * 5}px`,
        height: `${3 + Math.random() * 5}px`
      }"></div>
    </div>

    <!-- Thunder animation -->
    <div v-if="animationType === 'weather-thunder'" class="thunder-container">
      <div class="lightning" :class="{ flash: isFlashing }"></div>
    </div>

    <!-- Clouds animation -->
    <div v-if="animationType === 'weather-clouds'" class="clouds-container">
      <!-- Main clouds layer -->
      <div v-for="i in 6" :key="i" class="cloud main-cloud" :style="{ 
        left: `${-20 + Math.random() * 120}%`, 
        top: `${5 + Math.random() * 20}%`,
        opacity: 0.7 + Math.random() * 0.2,
        transform: `scale(${0.5 + Math.random() * 0.5})`,
        animationDuration: `${60 + Math.random() * 40}s`,
        animationDelay: `${Math.random() * 30}s`,
        filter: `blur(${0.5 + Math.random() * 0.5}px)`
      }"></div>
      
      <!-- Background clouds layer -->
      <div v-for="i in 4" :key="i + 'bg'" class="cloud bg-cloud" :style="{ 
        left: `${-20 + Math.random() * 120}%`, 
        top: `${15 + Math.random() * 15}%`,
        opacity: 0.3 + Math.random() * 0.2,
        transform: `scale(${0.7 + Math.random() * 0.6})`,
        animationDuration: `${80 + Math.random() * 40}s`,
        animationDelay: `${Math.random() * 20}s`,
        filter: `blur(${1 + Math.random() * 2}px)`
      }"></div>
      
      <!-- Small detail clouds -->
      <div v-for="i in 5" :key="i + 'sm'" class="small-cloud" :style="{ 
        left: `${-10 + Math.random() * 110}%`, 
        top: `${5 + Math.random() * 30}%`,
        opacity: 0.6 + Math.random() * 0.3,
        transform: `scale(${0.3 + Math.random() * 0.3})`,
        animationDuration: `${50 + Math.random() * 30}s`,
        animationDelay: `${Math.random() * 25}s`
      }"></div>
    </div>

    <!-- Mist/Fog/Haze animation -->
    <div v-if="animationType === 'weather-mist'" class="mist-container">
      <div v-for="i in 4" :key="i" class="mist-layer" :style="{ 
        opacity: 0.1 + (i * 0.05),
        top: `${10 + (i * 20)}%`,
        animationDuration: `${80 + (i * 20)}s`
      }"></div>
    </div>

    <!-- Dust/Sand/Ash animation -->
    <div v-if="animationType === 'weather-dust'" class="dust-container">
      <div v-for="i in 30" :key="i" class="dust-particle" :style="{ 
        left: `${Math.random() * 100}%`, 
        top: `${Math.random() * 100}%`,
        opacity: 0.3 + Math.random() * 0.3,
        width: `${1 + Math.random() * 3}px`,
        height: `${1 + Math.random() * 3}px`,
        animationDuration: `${5 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 5}s`
      }"></div>
    </div>

    <!-- Wind animation -->
    <div v-if="animationType === 'weather-wind'" class="wind-container">
      <div v-for="i in 8" :key="i" class="wind-line" :style="{ 
        top: `${10 + (i * 10)}%`,
        animationDuration: `${2 + Math.random() * 3}s`,
        animationDelay: `${Math.random() * 2}s`,
        width: `${20 + Math.random() * 60}%`
      }"></div>
    </div>

    <!-- Sun rays animation -->
    <div v-if="animationType === 'weather-sun'" class="sun-container">
      <div class="sun-circle"></div>
      <div v-for="i in 12" :key="i" class="sun-ray" :style="{ 
        transform: `rotate(${i * 30}deg)`,
        animationDelay: `${i * 0.2}s`
      }"></div>
    </div>

    <!-- Stars animation -->
    <div v-if="animationType === 'weather-stars'" class="stars-container">
      <div v-for="i in 50" :key="i" class="star" :style="{ 
        left: `${Math.random() * 100}%`, 
        top: `${Math.random() * 100}%`,
        animationDuration: `${1 + Math.random() * 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        width: `${1 + Math.random() * 2}px`,
        height: `${1 + Math.random() * 2}px`
      }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  animationType: {
    type: String,
    default: ''
  }
});

// For thunder animation
const isFlashing = ref(false);
let thunderInterval;

onMounted(() => {
  if (props.animationType === 'weather-thunder') {
    startThunderAnimation();
  }
});

watch(() => props.animationType, (newType) => {
  if (newType === 'weather-thunder') {
    startThunderAnimation();
  } else {
    clearInterval(thunderInterval);
  }
});

onUnmounted(() => {
  clearInterval(thunderInterval);
});

const startThunderAnimation = () => {
  // Clear any existing interval
  clearInterval(thunderInterval);
  
  // Create random thunder flashes
  thunderInterval = setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance of thunder
      isFlashing.value = true;
      setTimeout(() => {
        isFlashing.value = false;
      }, 200);
      
      // Sometimes do a double flash
      if (Math.random() > 0.6) {
        setTimeout(() => {
          isFlashing.value = true;
          setTimeout(() => {
            isFlashing.value = false;
          }, 100);
        }, 300);
      }
    }
  }, 3000);
};
</script>

<style scoped>
.weather-animation-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

/* Rain Animation */
.rain-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.rain-drop {
  position: absolute;
  top: -20px;
  width: 1px;
  height: 20px;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.7));
  animation: rain-fall linear infinite;
}

@keyframes rain-fall {
  to { transform: translateY(calc(100vh + 20px)); }
}

/* Drizzle Animation */
.drizzle-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.drizzle-drop {
  position: absolute;
  top: -10px;
  width: 1px;
  height: 10px;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.5));
  animation: drizzle-fall linear infinite;
}

@keyframes drizzle-fall {
  to { transform: translateY(calc(100vh + 10px)); }
}

/* Snow Animation */
.snow-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.snowflake {
  position: absolute;
  top: -10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  animation: snow-fall linear infinite;
}

@keyframes snow-fall {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(25vh) translateX(5px) rotate(45deg);
  }
  50% {
    transform: translateY(50vh) translateX(-5px) rotate(90deg);
  }
  75% {
    transform: translateY(75vh) translateX(5px) rotate(135deg);
  }
  100% {
    transform: translateY(calc(100vh + 10px)) translateX(-5px) rotate(180deg);
  }
}

/* Thunder Animation */
.thunder-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.lightning {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  transition: background-color 0.1s ease;
}

.lightning.flash {
  background-color: rgba(255, 255, 255, 0.3);
}

/* Clouds Animation */
.clouds-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Main cloud styles */
.cloud {
  position: absolute;
  width: 180px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  animation: cloud-drift linear infinite;
  box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.3);
}

.cloud:before, .cloud:after {
  content: '';
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 15px 4px rgba(255, 255, 255, 0.3);
}

.cloud:before {
  width: 80px;
  height: 80px;
  top: -40px;
  left: 25px;
}

.cloud:after {
  width: 100px;
  height: 100px;
  top: -50px;
  right: 25px;
}

/* Background cloud variation */
.bg-cloud {
  background-color: rgba(255, 255, 255, 0.6);
}

.bg-cloud:before, .bg-cloud:after {
  background-color: rgba(255, 255, 255, 0.6);
}

/* Small cloud style */
.small-cloud {
  position: absolute;
  width: 100px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 30px;
  animation: cloud-drift linear infinite;
  box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
}

.small-cloud:before, .small-cloud:after {
  content: '';
  position: absolute;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.3);
}

.small-cloud:before {
  width: 50px;
  height: 50px;
  top: -25px;
  left: 15px;
}

.small-cloud:after {
  width: 60px;
  height: 60px;
  top: -30px;
  right: 15px;
}

@keyframes cloud-drift {
  from { transform: translateX(0); }
  to { transform: translateX(calc(100vw + 200px)); }
}

/* Mist/Fog Animation */
.mist-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mist-layer {
  position: absolute;
  width: 200%;
  height: 40%;
  background: linear-gradient(to right, 
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.3) 25%,
    rgba(255,255,255,0.3) 75%,
    rgba(255,255,255,0) 100%
  );
  animation: mist-drift linear infinite;
}

@keyframes mist-drift {
  from { transform: translateX(-50%); }
  to { transform: translateX(0%); }
}

/* Dust Animation */
.dust-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.dust-particle {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  animation: dust-float linear infinite;
}

@keyframes dust-float {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, 10px);
  }
  50% {
    transform: translate(20px, 0);
  }
  75% {
    transform: translate(10px, -10px);
  }
  100% {
    transform: translate(0, 0);
  }
}

/* Wind Animation */
.wind-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.wind-line {
  position: absolute;
  height: 2px;
  left: -100px;
  background: linear-gradient(to right, 
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.5) 50%,
    rgba(255,255,255,0) 100%
  );
  animation: wind-blow linear infinite;
}

@keyframes wind-blow {
  from { transform: translateX(0); }
  to { transform: translateX(calc(100vw + 200px)); }
}

/* Sun Animation */
.sun-container {
  position: absolute;
  top: 40px;
  right: 40px;
  width: 80px;
  height: 80px;
}

.sun-circle {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  top: 20px;
  left: 20px;
  animation: sun-pulse 4s ease-in-out infinite;
}

.sun-ray {
  position: absolute;
  top: 38px;
  left: 60px;
  width: 30px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.6);
  transform-origin: 0 50%;
  animation: sun-ray-pulse 3s ease-in-out infinite;
}

@keyframes sun-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes sun-ray-pulse {
  0%, 100% { opacity: 0.6; width: 30px; }
  50% { opacity: 0.8; width: 35px; }
}

/* Stars Animation */
.stars-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: star-twinkle ease-in-out infinite;
}

@keyframes star-twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}
</style>
