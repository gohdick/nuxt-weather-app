<template>
  <div class="insights-container bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-md rounded-xl p-5 shadow-lg transform transition-all duration-300 hover:shadow-xl">
    <h3 class="text-xl font-bold text-white mb-4 flex items-center">
      <span class="mr-2">✨</span> คำแนะนำ
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Activity Recommendations -->
      <div class="recommendation-card bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30 shadow-inner">
        <div class="flex items-center mb-3">
          <div class="p-2 bg-blue-500/30 rounded-full mr-3">
            <span class="text-xl">{{ activityEmoji }}</span>
          </div>
          <p class="font-semibold text-white">กิจกรรม</p>
        </div>
        <div class="text-white/90">
          <p class="font-medium mb-1">&nbsp;{{ activityTitle }}</p>
          <p class="text-sm italic">&nbsp;{{ activityDescription }}</p>
        </div>
      </div>
      
      <!-- Clothing Suggestions -->
      <div class="recommendation-card bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30 shadow-inner">
        <div class="flex items-center mb-3">
          <div class="p-2 bg-blue-500/30 rounded-full mr-3">
            <span class="text-xl">{{ clothingEmoji }}</span>
          </div>
          <p class="font-semibold text-white">การแต่งกาย</p>
        </div>
        <div class="text-white/90">
          <p class="font-medium mb-1">&nbsp;{{ clothingTitle }}</p>
          <p class="text-sm italic">&nbsp;{{ clothingDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  weather: {
    type: Object,
    required: true
  }
});

// Activity recommendation title and description
const activityData = computed(() => {

  const temp = props.weather.main.temp;
  const condition = props.weather.weather[0].main.toLowerCase();
  const windSpeed = props.weather.wind.speed;
  
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
    return {
      title: 'ทำกิจกรรมในร่ม',
      description: 'วันนี้ฝนตก ควรอ่านหนังสือ ดูหนัง หรือไปห้างสรรพสินค้า'
    };
  } else if (condition.includes('snow')) {
    return {
      title: 'เล่นหิมะหรืออยู่บ้าน',
      description: 'วันนี้หิมะตก เหมาะสำหรับกิจกรรมเล่นหิมะ หรือจิบเครื่องดื่มอุ่นๆ'
    };
  } else if (condition.includes('clear') && temp > 30) {
    return {
      title: 'กิจกรรมทางน้ำ',
      description: 'อากาศร้อนแต่แจ่มใส เหมาะสำหรับว่ายน้ำ อย่าลืมทาครีมกันแดด'
    };
  } else if (condition.includes('clear') && temp >= 25 && temp <= 30) {
    return {
      title: 'กิจกรรมกลางแจ้ง',
      description: 'อากาศดีเยี่ยม เหมาะสำหรับปิกนิก ปั่นจักรยาน หรือเดินเล่นในสวน'
    };
  } else if (condition.includes('clear') && temp < 25) {
    return {
      title: 'ออกกำลังกายกลางแจ้ง',
      description: 'อากาศเย็นสบาย เหมาะสำหรับเดินเขา หรือวิ่งจ๊อกกิ้ง'
    };
  } else if (condition.includes('cloud')) {
    return {
      title: 'เดินเล่นถ่ายรูป',
      description: 'วันนี้มีเมฆมาก เหมาะสำหรับถ่ายรูป หรือนั่งร้านกาแฟชิลๆ'
    };
  } else if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
    return {
      title: 'กิจกรรมในร่ม',
      description: 'ทัศนวิสัยไม่ดี ควรระมัดระวังการขับขี่ เหมาะสำหรับอยู่บ้าน'
    };
  } else if (windSpeed > 10) {
    return {
      title: 'หลีกเลี่ยงที่โล่งแจ้ง',
      description: 'ลมแรงวันนี้ ไม่เหมาะกับกิจกรรมที่ต้องใช้อุปกรณ์เบา เช่น ร่ม หรือเต็นท์'
    };
  } else {
    return {
      title: 'กิจกรรมได้หลากหลาย',
      description: 'สภาพอากาศปกติ เหมาะสำหรับทำกิจกรรมทั้งในร่มและกลางแจ้ง'
    };
  }
});

const activityTitle = computed(() => activityData.value.title);
const activityDescription = computed(() => activityData.value.description);

// Clothing suggestion based on temperature and conditions
const clothingData = computed(() => {
  const temp = props.weather.main.temp;
  const condition = props.weather.weather[0].main.toLowerCase();
  const humidity = props.weather.main.humidity;
  
  if (condition.includes('rain') || condition.includes('drizzle')) {
    return {
      title: 'เตรียมร่มและชุดกันฝน',
      description: 'ควรพกร่ม ใส่เสื้อกันฝน รองเท้ากันน้ำ และหลีกเลี่ยงรองเท้าผ้า'
    };
  } else if (condition.includes('thunderstorm')) {
    return {
      title: 'อยู่ในที่ร่มและกันฝน',
      description: 'ฝนฟ้าคะนอง ควรพกร่ม ใส่เสื้อกันฝน รองเท้ากันน้ำ'
    };
  } else if (humidity > 80 && temp > 25) {
    return {
      title: 'เสื้อผ้าระบายอากาศ',
      description: 'อากาศร้อนชื้น ควรใส่ผ้าฝ้าย หลีกเลี่ยงผ้าสังเคราะห์'
    };
  } else if (temp >= 35) {
    return {
      title: 'เสื้อผ้าบางเบาสีอ่อน',
      description: 'อากาศร้อนมาก ควรใส่เสื้อผ้าระบายอากาศดี หมวกและแว่นกันแดด'
    };
  } else if (temp >= 30 && temp < 35) {
    return {
      title: 'เสื้อแขนสั้นกางเกงขาสั้น',
      description: 'อากาศร้อน ควรใส่ผ้าฝ้าย และพกร่มกันแดดเวลาออกนอกบ้าน'
    };
  } else if (temp >= 25 && temp < 30) {
    return {
      title: 'ชุดสบายๆ และรองเท้าแตะ',
      description: 'อากาศอบอุ่น เสื้อยืด กางเกงขาสั้นหรือกางเกงเบาสบาย'
    };
  } else if (temp >= 20 && temp < 25) {
    return {
      title: 'เสื้อแขนยาวบาง',
      description: 'อากาศเย็นสบาย กางเกงขายาว หรือเสื้อคลุมบางเบา'
    };
  } else if (temp >= 15 && temp < 20) {
    return {
      title: 'เสื้อแขนยาวและถุงเท้า',
      description: 'อากาศเย็น ควรใส่เสื้อคลุมบาง กางเกงขายาว ถุงเท้า'
    };
  } else if (temp >= 10 && temp < 15) {
    return {
      title: 'เสื้อกันหนาวบาง',
      description: 'อากาศค่อนข้างหนาว ควรใส่เสื้อชั้นใน กางเกงขายาว ถุงเท้าหนา'
    };
  } else {
    return {
      title: 'เสื้อกันหนาวหนา',
      description: 'อากาศหนาว ควรใส่เสื้อหลายชั้น ผ้าพันคอ ถุงมือ หมวกไหมพรม'
    };
  }
});

const clothingTitle = computed(() => clothingData.value.title);
const clothingDescription = computed(() => clothingData.value.description);

// Emojis for the recommendations
const activityEmoji = computed(() => {
  const condition = props.weather.weather[0].main.toLowerCase();
  
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
    return '🏠';
  } else if (condition.includes('snow')) {
    return '☃️';
  } else if (condition.includes('clear') && props.weather.main.temp > 30) {
    return '🏊';
  } else if (condition.includes('clear')) {
    return '🚶';
  } else if (condition.includes('cloud')) {
    return '📸';
  } else if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
    return '🧘';
  } else {
    return '🌈';
  }
});

const clothingEmoji = computed(() => {
  const temp = props.weather.main.temp;
  const condition = props.weather.weather[0].main.toLowerCase();
  
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
    return '☂️';
  } else if (temp >= 30) {
    return '👕';
  } else if (temp >= 20 && temp < 30) {
    return '👚';
  } else if (temp >= 10 && temp < 20) {
    return '🧥';
  } else {
    return '🧣';
  }
});
</script>

<style scoped>
.insights-container {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.recommendation-card {
  transition: all 0.3s ease;
}

.recommendation-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
