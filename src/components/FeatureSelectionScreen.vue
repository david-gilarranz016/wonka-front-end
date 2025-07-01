<script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  // When mounted, request the selected technology's features
  onMounted(async () => {
    // Request the features
    const features = await axios.get(`${process.env.VUE_APP_API_BASE}/web-shell/${$route.params.technology}`);
  });
</script>

<template>
</template>
