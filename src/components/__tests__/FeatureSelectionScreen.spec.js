import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import axios from 'axios';

import FeatureSelectionScreen from '../FeatureSelectionScreen.vue';
import OptionGroup from '../OptionGroup.vue';
import BasicOptionComponent from '../BasicOptionComponent.vue';
import { GenerationRequest } from '../GenerationRequest.js';
import { nextTick } from 'vue';

// Mocked route
let mockRoute = {
  params: {
    technology: 'php'
  }
};

// Response to feature requests
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
    key: 'nonce-validation',
    name: 'Nonce Validation',
    type: 'security',
    description: 'Nonce valiadtion protection.'
  },
  {
    key: 'ip-validation',
    name: 'IP Validation',
    type: 'security',
    description: 'Ip Validation protection.',
    input: {
      key: 'IP_WHITELIST',
      type: 'text',
      placeholder: '10.128.20.1, ::1',
      label: 'Allowed IPs'
    } 
  },
];

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

  it('Creates an OptionGroup for the normal features', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Expect an option group to have been created
    expect(wrapper.findAllComponents(OptionGroup)[0].text()).toContain('WebShell Features');
  });

  it('Creates an OptionGroup for the security features', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Expect an option group to have been created
    expect(wrapper.findAllComponents(OptionGroup)[1].text()).toContain('Additional Protections');
  });

  it('Creates a BasicOption for all features that do not require input', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Verify that all features were created with a BasicOption
    mockedFeatures.filter((f) => f.type === 'feature').forEach(f => {
      // Find the option
      const option = wrapper.findAllComponents(BasicOptionComponent).filter(c => c.props('id') === f.key)[0];

      // Expect the props to be correct
      expect(option.props('label')).toEqual(f.name);
      expect(option.props('description')).toEqual(f.description);
      expect(option.props('selected')).toEqual(false);
    });
  });
});

async function mockAxiosAndCreateWrapper() {
  // Mock the axios `get` method
  vi.spyOn(axios, 'get').mockResolvedValue(mockedFeatures);

  // Mount the component
  const wrapper = mount(FeatureSelectionScreen);

  // Wait until the DOM updates
  await flushPromises();

  // Return the wrapper
  return wrapper;
}
