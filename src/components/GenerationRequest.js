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
  },
  hasFeature(feature) {
    return this.request.features.filter(f => f.key === feature.key).length === 1;
  },
  updateFeature(feature) {
    this.request.features.forEach((f, index) => {
      if (f.key === feature.key) {
        this.request.features[index] = feature;
      }
    });
  },
  removeFeature(feature) {
    const index = this.request.features.findIndex(f => f.key === feature.key)
    this.request.features.splice(index, 1);
  }
});
