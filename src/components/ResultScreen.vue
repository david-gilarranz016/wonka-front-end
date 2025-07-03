<script setup>
  import { onMounted, ref, computed } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { GenerationRequest } from './GenerationRequest.js';
  import { APIResponse } from './APIResponse.js';

  // State refs
  const success = ref(null);
  const response = ref({});
  const router = useRouter();

  // Computed properties
  const shellUrl = computed(() => `${import.meta.env.VITE_API_BASE}${response.value.shell ? response.value.shell.url : ''}`);
  const clientUrl = computed(() => `${import.meta.env.VITE_API_BASE}${response.value.client ? response.value.client.url : ''}`);
  const dependenciesUrl = computed(() => `${import.meta.env.VITE_API_BASE}${APIResponse.dependencies[GenerationRequest.request.client]}`);

  onMounted(async () => {
    // Send the generation request
    try {
      response.value = (await axios.post(`${import.meta.env.VITE_API_BASE}/generator`, GenerationRequest.request)).data;
      success.value = true;
    } catch (error) {
      success.value = false;
    }
  });

  const onStartOver = () => {
    // Reset the Generation request
    GenerationRequest.reset();

    // Navigate to the home screen
    router.push('/');
  };
</script>

<template>
  <div class="text-left">
    <h1 class="title">Generated Files</h1>
    <div v-if="success">
      <div class="mb-5">
        <h2 class="text-xl font-semibold mb-3">Web Shell</h2>
        <ul class="list">
          <li><span class="emphasize">Download link:</span> <a :href="shellUrl" target="_blank">{{ shellUrl }}</a></li>
          <li><span class="emphasize">Checksum:</span> {{ response.shell.checksum.value }} ({{ response.shell.checksum.algorithm }})</li>
        </ul>
      </div>
      <div class="mb-5">
        <h2 class="text-xl font-semibold mb-3">Client</h2>
        <ul class="list">
          <li><span class="emphasize">Download link:</span> <a :href="clientUrl" target="_blank">{{ clientUrl }}</a></li>
          <li><span class="emphasize">Dependencies:</span> <a :href="dependenciesUrl" target="_blank">{{ dependenciesUrl }}</a></li>
          <li><span class="emphasize">Checksum:</span> {{ response.client.checksum.value }} ({{ response.client.checksum.algorithm }})</li>
        </ul>
      </div>
      <p class="border border-yellow-200 bg-yellow-300/20 p-5 rounded-lg text-center">
      <b>Note:</b> Installation of dependencies might be necessary for the client to work. If unable to run
        the client, check if any dependencies are missing.
      </p>
    </div>
    <div v-else="success">
      <p class="border border-red-400 bg-red-800/20 p-5 rounded-lg text-center text-red-400 font-bold">
        An error has occurred
      </p>
    </div>
    <div class="flex justify-center mt-10">
      <button class="btn" @click="onStartOver">Start over</button>
    </div>
  </div>
</template>
