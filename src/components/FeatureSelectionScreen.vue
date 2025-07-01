<script setup>
  import axios from 'axios';
  import { onMounted, ref, computed } from 'vue';
  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';
  import InputOptionComponent from './InputOptionComponent.vue';
  import { GenerationRequest } from './GenerationRequest.js';

  // State variables
  const unfilteredFeatures = ref([]);

  // Computed properties to distinguish between basic and non input-based protections
  const features = computed(() => unfilteredFeatures.value.filter(f => f.type === 'feature'));
  const basicProtections = computed(() => unfilteredFeatures.value.filter(p => p.type === 'security' && p.input === undefined));
  const inputProtections = computed(() => unfilteredFeatures.value.filter(p => p.type === 'security' && p.input !== undefined));

  // When mounted, request the selected technology's features
  onMounted(async () => {
    // Request the features
    const response = await axios.get(`${process.env.VUE_APP_API_BASE}/web-shell/${$route.params.technology}`);
    response.forEach(f => f.selected = false);

    // Initialize the features and protection arrays
    unfilteredFeatures.value = response;
  });

  // Handler for feature and protection selection events
  const onBasicFeatureSelected = (feature) => {
    // Add the feature to the generation request
    GenerationRequest.addFeature(feature);

    // Set the feature as selected
    unfilteredFeatures.value.forEach(f => {
      if(f.key === feature.key) {
        f.selected = true;
      }
    });
  };
</script>

<template>
  <div>
    <OptionGroup title="WebShell Features">
      <BasicOptionComponent v-for="f in features"
                            :key="f.key"
                            :id="f.key"
                            :label="f.name"
                            :description="f.description"
                            :selected="f.selected"
                            @selected="onBasicFeatureSelected"
      />
    </OptionGroup>
    <OptionGroup title="Additional Protections">
      <BasicOptionComponent v-for="p in basicProtections"
                            :key="p.key"
                            :id="p.key"
                            :label="p.name"
                            :description="p.description"
                            :selected="p.selected"
                            @selected="onBasicFeatureSelected"
      />
      <InputOptionComponent v-for="p in inputProtections"
                            :key="p.key"
                            :id="p.key"
                            :label="p.name"
                            :description="p.description"
                            :placeholder="p.input.placeholder"
                            :argument-name="p.input.key"
                            :selected="p.selected"
      />
    </OptionGroup>
  </div>
</template>
