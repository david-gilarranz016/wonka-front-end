import { reactive } from 'vue';

// Shared state variable to hold the crafted generationRequest

export const GenerationRequest = reactive({
  request: {
    shell: '',
    client: '',
    features: [],
    output: {
      format: ''
    }
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
  },
  getShellTechnology() {
    return this.request.shell;
  },
  setOutputFormat(format) {
    this.request.output.format = format;
  },
  setOutputOption(option, value) {
    this.request.output[option] = value
  },
  reset() {
    this.request = {
      shell: '',
      client: '',
      features: [],
      output: {
        format: ''
      }
    }
  }
});
