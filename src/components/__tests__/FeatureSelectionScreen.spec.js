import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import axios from 'axios';

import FeatureSelectionScreen from '../FeatureSelectionScreen.vue';
import OptionGroup from '../OptionGroup.vue';
import BasicOptionComponent from '../BasicOptionComponent.vue';
import { GenerationRequest } from '../GenerationRequest.js';
import { nextTick } from 'vue';

let mockRoute = {
  params: {
    technology: 'php'
  }
};

describe('FeatureSelectionScreen', () => {
  // Before each test, mock the global object to include the $route
  beforeEach(() => {
    vi.stubGlobal('$route', mockRoute);
  });

  // Reset the mock route to it's original state after each test
  afterEach(() => {
    mockRoute = {
      params: {
        technology: 'php'
      }
    };
  });

  it("Requests the selected technology's features to the backend", async () => {
    await mockAxiosAndCreateWrapper();

    // Expect the API to have been called with the appropriate technology
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_API_BASE}/web-shell/${mockRoute.params.technology}`);
  });

  it("Requests a different selected technology's features to the backend", async () => {
    // Modify the path param to a different technology
    mockRoute.params.technology = 'asp'

    // Setup the test
    await mockAxiosAndCreateWrapper();

    // Expect the API to have been called with the appropriate technology
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_API_BASE}/web-shell/${mockRoute.params.technology}`);
  });

});

async function mockAxiosAndCreateWrapper() {
  // Mock the axios `get` method
  const mockedFeatures = [
    {
      key: 'command-execution',
      name: 'Command Execution',
      type: 'feature',
      description: 'Command execution capability.'
    },
    {
      key: 'file-upload',
      name: 'File Upload',
      type: 'feature',
      description: 'File Upload Capabitily.'
    },
    {
      key: 'ip-validation',
      name: 'IP Validation',
      type: 'security',
      description: 'Ip Validation capability.',
      input: {
        key: 'IP_WHITELIST',
        type: 'text',
        placeholder: '10.128.20.1, ::1',
        label: 'Allowed IPs'
      } 
    },
  ];
  vi.spyOn(axios, 'get').mockResolvedValue(mockedFeatures);

  // Mount the component
  const wrapper = mount(FeatureSelectionScreen);

  // Wait until the DOM updates
  await flushPromises();

  // Return the wrapper
  return wrapper;
}
