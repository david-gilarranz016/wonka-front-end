<script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';

  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';
  import { GenerationRequest } from './GenerationRequest.js';

  // Create a ref for the available technologies
  const technologies = ref([]);

  // On Mount, request technologies from the server
  onMounted(async () => {
    // Get the available technologies
    const availableTechnologies = await axios.get(`${process.env.VUE_APP_API_BASE}/client`);

    // Mark all of them as unselected
    availableTechnologies.forEach((t) => t.selected = false);

    // Update the technologies array
    technologies.value = availableTechnologies;
  });

  // Handlers for selection events
  const onTechnologySelected = (e) => {
    // Update the generation request
    GenerationRequest.setClientTechnology(e.key);

    // Set the option as selected and unselect all other options
    technologies.value.forEach((t) => {
      if (t.technology === e.key) {
        t.selected = true;
      } else {
        t.selected = false;
      }
    });
  };

  // Handler for deselection events
  const onTechnologyDeselected = (e) => {
    // Update the generation request
    GenerationRequest.setClientTechnology('');

    // Set the option as unselected
    technologies.value.forEach((t) => {
      if (t.technology === e.key) {
        t.selected = false;
      }
    });
  };
</script>
<template>
  <OptionGroup title="Client Technologies">
    <BasicOptionComponent v-for="t in technologies"
                          :key="t.technology"
                          :id="t.technology"
                          :label="t.technology"
                          :description="t.technology"
                          :selected="t.selected"
                          @selected="onTechnologySelected"
                          @deselected="onTechnologyDeselected"
    />
  </OptionGroup>
</template>
