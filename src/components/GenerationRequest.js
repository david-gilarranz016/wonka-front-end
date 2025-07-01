import { reactive } from 'vue';

// Shared state variable to hold the crafted generationRequest

export const GenerationRequest = reactive({
  request: {
    shell: '',
    client: '',
    features: []
  },
  setShellTechnology(technology) {
    this.request.shell = technology;
  },
  setClientTechnology(technology) {
    this.request.client = technology;
  },
  addFeature(feature) {
    this.request.features.push(feature);
  }
});
