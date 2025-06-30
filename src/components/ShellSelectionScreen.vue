<script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';

  // Create a ref for the available technologies
  const technologies = ref([]);

  // On Mount, request technologies from the server
  onMounted(async () => {
    // Get the available technologies
    const availableTechnologies = await axios.get(`${process.env.VUE_APP_API_BASE}/web-shell`);

    // Mark all of them as unselected
    availableTechnologies.forEach((t) => t.selected = false);

    // Update the technologies array
    technologies.value = availableTechnologies;
  });
</script>
<template>
  <OptionGroup title="WebShell Technologies">
    <BasicOptionComponent v-for="t in technologies"
                          :key="t.technology"
                          :id="t.technology"
                          :label="t.technology"
                          :description="t.technology"
                          :selected="t.selected"
    />
  </OptionGroup>
</template>
