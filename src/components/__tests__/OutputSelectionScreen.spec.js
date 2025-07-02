import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

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
    type: 'output,option',
    description: 'Obfuscate the generated shell'
  }
];

// Mock the Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

describe('OutputSelectionScreen', () => {
  beforeEach(() => {
    // Populate the API response object with the canned response
    APIResponse.features = mockFeatures;
  });

  afterEach(() => {
    // Reset the Global Objects
    APIResponse.features = [];
    GenerationRequest.request.output = {
      format: ''
    };
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

  it('Creates a BasicOption for each available output format', () => {
    const wrapper = mount(OutputSelectionScreen);

    // Expect an option to be created with the appropriate props for each format
    APIResponse.features.filter(f => f.type === 'output,format').forEach(format => {
      const option = wrapper.findAllComponents(OptionGroup)[0]
        .findAllComponents(BasicOptionComponent)
        .filter(option => option.props('id') === format.key)[0];

      expect(option.props('label')).toEqual(format.name);
      expect(option.props('description')).toEqual(format.description);
      expect(option.props('selected')).toEqual(false);
    });
  });

  it('Creates a BasicOption for each available output option', () => {
    const wrapper = mount(OutputSelectionScreen);

    // Expect an option to be created with the appropriate props for each format
    APIResponse.features.filter(f => f.type === 'output,option').forEach(format => {
      const option = wrapper.findAllComponents(OptionGroup)[1]
        .findAllComponents(BasicOptionComponent)
        .filter(option => option.props('id') === format.key)[0];

      expect(option.props('label')).toEqual(format.name);
      expect(option.props('description')).toEqual(format.description);
      expect(option.props('selected')).toEqual(false);
    });
  });

  it('Sets the output format when receives a selected envent', async () => {
    const wrapper = mount(OutputSelectionScreen);

    // Select one output format
    const option = wrapper.findAllComponents(OptionGroup)[0].findAllComponents(BasicOptionComponent)[0];
    option.find('button').trigger('click');
    await nextTick();

    // Expect the GenerationRequest to contain the format
    expect(GenerationRequest.request.output.format).toEqual(option.props('id'));
  });

  it('Sets the option as selected when receives a selected event', async () => {
    const wrapper = mount(OutputSelectionScreen);

    // Select one output format
    const option = wrapper.findAllComponents(OptionGroup)[0].findAllComponents(BasicOptionComponent)[0];
    option.find('button').trigger('click');

    // Expect the BasicOption format to be selected
    expect(option.props('selected')).toBe(true);
  });

  it('Unselects all other options when receives a selected event', async () => {
    const wrapper = mount(OutputSelectionScreen);

    // Select one output format
    const firstOption = wrapper.findAllComponents(OptionGroup)[0].findAllComponents(BasicOptionComponent)[0];
    firstOption.find('button').trigger('click');
    await nextTick();

    // Select a different output format
    const secondOption = wrapper.findAllComponents(OptionGroup)[0].findAllComponents(BasicOptionComponent)[1];
    secondOption.find('button').trigger('click');
    await nextTick();

    // Expect the first format to be unselected
    expect(firstOption.props('selected')).toBe(false);
  });

  it('Resets the output format when a deselect event is received', async () => {
    const wrapper = mount(OutputSelectionScreen);

    // Select one output format and click it twice to deselect it
    const option = wrapper.findAllComponents(OptionGroup)[0].findAllComponents(BasicOptionComponent)[0];

    option.find('button').trigger('click');
    await nextTick();

    option.find('button').trigger('click');
    await nextTick();

    // Expect the GenerationRequest to contain the format
    expect(GenerationRequest.request.output.format).toEqual('');
  });

  it('Sets the option as deselected when receives a deselected event', async () => {
    const wrapper = mount(OutputSelectionScreen);

    // Select one output format and click it twice to deselect it
    const option = wrapper.findAllComponents(OptionGroup)[0].findAllComponents(BasicOptionComponent)[0];

    option.find('button').trigger('click');
    await nextTick();

    option.find('button').trigger('click');
    await nextTick();

    // Expect the BasicOption format to be selected
    expect(option.props('selected')).toBe(false);
  });

  it('Sets the output option as true when receives a selected event', async () => {
    const wrapper = mount(OutputSelectionScreen);

    // Select one output format
    const option = wrapper.findAllComponents(OptionGroup)[1].findAllComponents(BasicOptionComponent)[0];
    option.find('button').trigger('click');
    await nextTick();

    // Expect the GenerationRequest to contain the output option as true
    expect(GenerationRequest.request.output[option.props('id')]).toBe(true);
  });

  it('Sets the output option as selected when receives a selected event', async () => {
    const wrapper = mount(OutputSelectionScreen);

    // Select one output format
    const option = wrapper.findAllComponents(OptionGroup)[1].findAllComponents(BasicOptionComponent)[0];
    option.find('button').trigger('click');

    // Expect the BasicOption format to be selected
    expect(option.props('selected')).toBe(true);
  });

  it('Sets the output option as false when receives a selected event', async () => {
    const wrapper = mount(OutputSelectionScreen);

    // Select and deselect one output format
    const option = wrapper.findAllComponents(OptionGroup)[1].findAllComponents(BasicOptionComponent)[0];

    option.find('button').trigger('click');
    await nextTick();

    option.find('button').trigger('click');
    await nextTick();

    // Expect the GenerationRequest to contain the output option as false
    expect(GenerationRequest.request.output[option.props('id')]).toBe(false);
  });

  it('Sets the output option as selected when receives a selected event', async () => {
    const wrapper = mount(OutputSelectionScreen);

    // Select and deselect one output format
    const option = wrapper.findAllComponents(OptionGroup)[1].findAllComponents(BasicOptionComponent)[0];

    option.find('button').trigger('click');
    await nextTick();

    option.find('button').trigger('click');
    await nextTick();

    // Expect the BasicOption format to be selected
    expect(option.props('selected')).toBe(false);
  });

  it('Sets all output options as false on mount', async () => {
    mount(OutputSelectionScreen);
    
    mockFeatures.filter(f => f.type === 'output,option').forEach(option => {
      // Expect the GenerationRequest to contain the output option as false
      expect(GenerationRequest.request.output[option.key]).toBe(false);
    });
  });

  it('Navigates to the next screen', async () => {
    // Stub the router
    const push = vi.fn();
    useRouter.mockImplementationOnce(() => ({ push }));

    const wrapper = mount(OutputSelectionScreen);

    // Select one output format
    const option = wrapper.findAllComponents(OptionGroup)[0].findAllComponents(BasicOptionComponent)[0];

    option.find('button').trigger('click');
    await nextTick();

    // Trigger the navigation
    wrapper.find('#navigation-button').trigger('click');

    expect(push).toHaveBeenCalledExactlyOnceWith('/client');
  });

  it('Does not navigate to the next unless an output format is selected', async () => {
    // Stub the router
    const push = vi.fn();
    useRouter.mockImplementationOnce(() => ({ push }));

    const wrapper = mount(OutputSelectionScreen);

    // Trigger the navigation
    wrapper.find('#navigation-button').trigger('click');

    expect(push).not.toHaveBeenCalled();
  });
});
