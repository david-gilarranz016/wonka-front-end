<script setup>
  import axios from 'axios';
  import { onMounted, ref, computed } from 'vue';
  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';
  import InputOptionComponent from './InputOptionComponent.vue';
  import { GenerationRequest } from './GenerationRequest.js';
  import { APIResponse } from './APIResponse.js';

  // State variables
  const unfilteredFeatures = ref([]);

  // Computed properties to distinguish between basic and non input-based protections
  const features = computed(() => APIResponse.features.filter(f => f.type === 'feature'));
  const basicProtections = computed(() => APIResponse.features.filter(p => p.type === 'security' && p.input === undefined));
  const inputProtections = computed(() => APIResponse.features.filter(p => p.type === 'security' && p.input !== undefined));

  // When mounted, request the selected technology's features
  onMounted(async () => {
    // Request the features
    const response = await axios.get(`${process.env.VUE_APP_API_BASE}/web-shell/${GenerationRequest.getShellTechnology()}`);
    response.forEach(f => f.selected = false);

    // Initialize the features and protection arrays
    APIResponse.features = response;
  });

  // Handler for feature and protection selection events
  const onBasicFeatureSelected = (feature) => {
    // Add the feature to the generation request
    GenerationRequest.addFeature(feature);

    // Set the feature as selected
    setSelected(feature, true);
  };

  // Handler for input selection events
  const onInputFeatureSelected = (feature) => {
    // Check if the feature has been added
    if(GenerationRequest.hasFeature(feature)) {
      GenerationRequest.updateFeature(feature);
    } else {
      GenerationRequest.addFeature(feature)
    }

    // Set the feature as selected
    setSelected(feature, true);
  };

  // Handler for deselection events
  const onFeatureDeselected = (feature) => {
    // Remove the feature from the request
    GenerationRequest.removeFeature(feature);
    
    // Unselect the feature
    setSelected(feature, false);
  };

  // Helper functions
  const setSelected = (feature, value) => {
    APIResponse.features.forEach(f => {
      if(f.key === feature.key) {
        f.selected = value;
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
                            @deselected="onFeatureDeselected"
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
                            @deselected="onFeatureDeselected"
      />
      <InputOptionComponent v-for="p in inputProtections"
                            :key="p.key"
                            :id="p.key"
                            :label="p.name"
                            :description="p.description"
                            :placeholder="p.input.placeholder"
                            :argument-name="p.input.key"
                            :selected="p.selected"
                            @selected="onInputFeatureSelected"
                            @deselected="onFeatureDeselected"
      />
    </OptionGroup>
  </div>
</template>
