import { reactive } from 'vue';

// Shared state variable to hold the crafted generationRequest

export const GenerationRequest = reactive({
  request: {
    shell: '',
    client: ''
  },
  setShellTechnology(technology) {
    this.request.shell = technology;
  },
  setClientTechnology(technology) {
    this.request.client = technology;
  }
});
