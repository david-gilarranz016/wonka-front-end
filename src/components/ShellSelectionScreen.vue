<script setup>
  import axios from 'axios';
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';

  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';
  import { GenerationRequest } from './GenerationRequest.js';

  // Create a ref for the available technologies
  const technologies = ref([]);
  const selected = computed(() => GenerationRequest.getShellTechnology() !== '');
  const router = useRouter();

  // On Mount, request technologies from the server
  onMounted(async () => {
    // Get the available technologies
    const availableTechnologies = await axios.get(`${import.meta.env.VITE_API_BASE}/web-shell`);

    // Mark all of them as unselected
    availableTechnologies.data.forEach((t) => t.selected = false);

    // Update the technologies array
    technologies.value = availableTechnologies.data;
  });

  // Handlers for selection events
  const onTechnologySelected = (e) => {
    // Update the generation request
    GenerationRequest.setShellTechnology(e.key);

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
    GenerationRequest.setShellTechnology('');

    // Set the option as unselected
    technologies.value.forEach((t) => {
      if (t.technology === e.key) {
        t.selected = false;
      }
    });
  };

  const onNavigate = () => {
    if (selected.value) {
      router.push('/features');
    }
  };
</script>
<template>
  <div>
  <OptionGroup title="WebShell Technologies">
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
  <button id="navigation-button" @click="onNavigate">Continue</button>
  </div>
</template>
