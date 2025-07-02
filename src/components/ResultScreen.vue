<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  import { GenerationRequest } from './GenerationRequest.js';

  const success = ref(null);
  const response = ref({});

  onMounted(async () => {
    // Send the generation request
    try {
      response.value = await axios.post(`${process.env.VUE_APP_API_BASE}/generator`, GenerationRequest.request);
      success.value = true;
    } catch (error) {
      success.value = false;
    }
  });
</script>

<template>
  <div>
    <div v-if="success">
      <h2>Web Shell</h2>
      <ul>
        <li>Checksum: {{ response.shell.checksum.value }} ({{ response.shell.checksum.algorithm }})</li>
        <li>Download link: <a :href="response.shell.url" target="_blank">{{ response.shell.url }}</a></li>
      </ul>
      <h2>Client</h2>
      <ul>
        <li>Checksum: {{ response.client.checksum.value }} ({{ response.client.checksum.algorithm }})</li>
        <li>Download link: <a :href="response.client.url" target="_blank">{{ response.client.url }}</a></li>
      </ul>
      <p>
        <b>Note:</b>Installation of dependencies might be necessary for the client to work. If unable to run
        the client, check if any dependencies are missing.
      </p>
    </div>
    <div v-else="success">
      <h2>An error has occurred</h2>
    </div>
  </div>
</template>
