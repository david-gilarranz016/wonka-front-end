import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import axios from 'axios';

import ShellSelectionScreen from '../ShellSelectionScreen.vue';
import OptionGroup from '../OptionGroup.vue';
import BasicOptionComponent from '../BasicOptionComponent.vue';
import { GenerationRequest } from '../GenerationRequest.js';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

// Mock the Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

describe('ShellSelectionScreen', () => {
  // Reset global state after each test
  afterEach(() => {
    GenerationRequest.setShellTechnology('');
  });

  it('Requests available technologies from the backend', async () => {
    await mockAxiosAndCreateWrapper();

    // Expect the API to have been called
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_API_BASE}/web-shell`);
  });

  it('Creates an OptionGroup for the requested technologies', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Expect an option group to have been created
    expect(wrapper.getComponent(OptionGroup).text()).toContain('WebShell Technologies');
  });

  it('Creates a BasicOptionComponent for each technology', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Expect a BasicOptionComponent to have been created for each technology
    expect(wrapper.findAllComponents(BasicOptionComponent).map(c => c.text()).join()).toEqual('php,asp');
  });

  it('Initializes all BasicOptionComponent as Unselected', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Click on each BasicOptionComponent once and expect them to 
    wrapper.findAllComponents(BasicOptionComponent).forEach((c) => {
      // Clickon the button
      c.find('button').trigger('click');

      // Expect the event to have been emitted
      expect(c.props('selected')).toBe(false);
    });
  });

  it('Sets the generationRequest shell technology to the selected one', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Click on the first option
    const option = wrapper.findAllComponents(BasicOptionComponent)[0];
    option.find('button').trigger('click');

    // Expect the GenerationRequest to have been updated
    expect(GenerationRequest.request.shell).toEqual(option.props('id'));
  });

  it('Sets the BasicOptionComponent as selected when clicked', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Click on the first option
    const option = wrapper.findAllComponents(BasicOptionComponent)[0];
    option.find('button').trigger('click');

    // Wait for the DOM to update
    await nextTick();

    // Expect the triggering option to be selected
    expect(option.props('selected')).toBe(true);
  });

  it('Unselects all other BasicOptionComponent when a different one is clicked', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Click on the first option and wait for the DOM to update
    const [ firstOption, secondOption] = wrapper.findAllComponents(BasicOptionComponent);
    firstOption.find('button').trigger('click');
    await nextTick();

    // Click on the second option and wait for the DOM to update
    secondOption.find('button').trigger('click');
    await nextTick();

    // Expect the first option to be unselected
    expect(firstOption.props('selected')).toBe(false);
  });

  it('Unsets the GenerationRequest shell technology when the selected option is deselected', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Click on the first option twice to deselect it
    const option = wrapper.findAllComponents(BasicOptionComponent)[0];

    option.find('button').trigger('click');
    await nextTick();

    option.find('button').trigger('click');
    await nextTick();

    // Expect the GenerationRequest to have been updated
    expect(GenerationRequest.request.shell).toEqual('');
  });

  it('Sets the BasicOptionComponent as deselected when clicked twice', async () => {
    const wrapper = await mockAxiosAndCreateWrapper();

    // Click on the first option twice to deselect it
    const option = wrapper.findAllComponents(BasicOptionComponent)[0];

    option.find('button').trigger('click');
    await nextTick();

    option.find('button').trigger('click');
    await nextTick();

    // Expect the triggering option to be deselected
    expect(option.props('selected')).toBe(false);
  });

  it('Navigates to the next screen if a technology has been selected', async () => {
    // Mock the implementation of the router
    const push = vi.fn();
    useRouter.mockImplementationOnce(() => ({ push }));

    const wrapper = await mockAxiosAndCreateWrapper();

    // Click on the first option to select it
    const option = wrapper.findAllComponents(BasicOptionComponent)[0];

    option.find('button').trigger('click');
    await nextTick();

    // Navigate to the next screen
    wrapper.find('#navigation-button').trigger('click');

    expect(push).toHaveBeenCalledExactlyOnceWith('/features');
  });

  it('Does not navigate to the next screen if a technology has not been selected', async () => {
    // Mock the implementation of the router
    const push = vi.fn();
    useRouter.mockImplementationOnce(() => ({ push }));

    const wrapper = await mockAxiosAndCreateWrapper();

    // Navigate to the next screen
    wrapper.find('#navigation-button').trigger('click');

    expect(push).not.toHaveBeenCalled();
  });
});

async function mockAxiosAndCreateWrapper() {
  // Mock the axios `get` method
  const mockedResponse = {
    data: [
      {
        technology: 'php',
        url: '/web-shell/php'
      },
      {
        technology: 'asp',
        url: '/web-shell/asp'
      }
    ]
  };
  vi.spyOn(axios, 'get').mockResolvedValue(mockedResponse);

  // Mount the component
  const wrapper = mount(ShellSelectionScreen);

  // Wait until the DOM updates
  await flushPromises();

  // Return the wrapper
  return wrapper;
}
