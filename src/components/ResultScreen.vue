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
  <div>
    <div v-if="success">
      <h2>Web Shell</h2>
      <ul>
        <li>Checksum: {{ response.shell.checksum.value }} ({{ response.shell.checksum.algorithm }})</li>
        <li>Download link: <a :href="shellUrl" target="_blank">{{ shellUrl }}</a></li>
      </ul>
      <h2>Client</h2>
      <ul>
        <li>Checksum: {{ response.client.checksum.value }} ({{ response.client.checksum.algorithm }})</li>
        <li>Download link: <a :href="clientUrl" target="_blank">{{ clientUrl }}</a></li>
        <li>Dependencies: <a :href="dependenciesUrl" target="_blank">{{ dependenciesUrl }}</a></li>
      </ul>
      <p>
        <b>Note:</b>Installation of dependencies might be necessary for the client to work. If unable to run
        the client, check if any dependencies are missing.
      </p>
    </div>
    <div v-else="success">
      <h2>An error has occurred</h2>
    </div>
    <button @click="onStartOver">Start over</button>
  </div>
</template>
