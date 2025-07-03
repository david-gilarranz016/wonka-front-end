<script setup>
  import axios from 'axios';
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';

  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';
  import { GenerationRequest } from './GenerationRequest.js';
  import { APIResponse } from './APIResponse.js';

  // Create a ref for the available technologies
  const technologies = ref([]);
  const router = useRouter();

  // Computed properties
  const selected = computed(() => GenerationRequest.request.client !== '');

  // On Mount, request technologies from the server
  onMounted(async () => {
    // Get the available technologies
    const availableTechnologies = await axios.get(`${import.meta.env.VITE_API_BASE}/client`);

    // Mark all of them as unselected and store the dependencies in APIResponse
    availableTechnologies.data.forEach((t) => { 
      t.selected = false;
      APIResponse.dependencies[t.technology] = t.dependencies;
    });

    // Update the technologies array
    technologies.value = availableTechnologies.data;
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

  const onNavigate = () => {
    if (selected.value) {
      router.push('/result');
    }
  };
</script>
<template>
  <div>
    <div class="mb-10">
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
    </div>
    <div class="flex justify-center">
      <button class="btn" id="navigation-button" @click="onNavigate">Generate</button>
    </div>
  </div>
</template>
