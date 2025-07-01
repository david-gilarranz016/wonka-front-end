import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import axios from 'axios';

import OutputSelectionScreen from '../OutputSelectionScreen.vue';
import OptionGroup from '../OptionGroup.vue';
import BasicOptionComponent from '../BasicOptionComponent.vue';
import { GenerationRequest } from '../GenerationRequest.js';
import { APIResponse } from '../APIResponse.js';

// Create a canned object of features received from the generator back-end
const mockFeatures = [
  {
    key: 'php',
    name: 'PHP',
    type: 'output,format',
    description: 'PHP output format'
  },
  {
    key: 'jpg',
    name: 'JPG',
    type: 'output,format',
    description: 'JPG output format'
  },
  {
    key: 'gif',
    name: 'GIF',
    type: 'output,format',
    description: 'GIF output format'
  },
  {
    key: 'obfuscate-code',
    name: 'Obfuscate code',
    type: 'ouptut,option',
    description: 'Obfuscate the generated shell'
  }
];

describe('OutputSelectionScreen', () => {
  beforeEach(() => {
    // Populate the API response object with the canned response
    APIResponse.features = mockFeatures;
  });

  afterEach(() => {
    // Reset the API response object
    APIResponse.features = [];
  });

  it('Creates an output group for format-related options', () => {
    const wrapper = mount(OutputSelectionScreen);

    // Expect the wrapper to contain the element
    expect(wrapper.findAllComponents(OptionGroup)[0].text()).toContain('Output Formats');
  });

  it('Creates an output group for additional output-related options', () => {
    const wrapper = mount(OutputSelectionScreen);

    // Expect the wrapper to contain the element
    expect(wrapper.findAllComponents(OptionGroup)[1].text()).toContain('Additional Options');
  });
});
