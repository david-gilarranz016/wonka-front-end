import { reactive } from 'vue';

// Shared state variable to hold the crafted generationRequest

export const GenerationRequest = reactive({
  request: {
    shell: ''
  },
  setShellTechnology(technology) {
    this.request.shell = technology;
  }
});
