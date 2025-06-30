import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import axios from 'axios';

import ShellSelectionScreen from '../ShellSelectionScreen.vue';
import OptionGroup from '../OptionGroup.vue';
import BasicOptionComponent from '../BasicOptionComponent.vue';

describe('ShellSelectionScreen', () => {
  it('Requests available technologies from the backend', async () => {
    // Mock the axios `get` method
    const mockedTechnologies = [
      {
        technology: 'php',
        url: '/web-shell/php'
      },
      {
        technology: 'asp',
        url: '/web-shell/asp'
      }
    ]
    vi.spyOn(axios, 'get').mockResolvedValue(mockedTechnologies);

    // Mount the component
    const wrapper = mount(ShellSelectionScreen);

    // Wait until the DOM updates
    await flushPromises();

    // Expect the API to have been called
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${process.env.VUE_APP_API_BASE}/web-shell`);
  });

  it('Creates an OptionGroup for the requested technologies', async () => {
    // Mock the axios `get` method
    const mockedTechnologies = [
      {
        technology: 'php',
        url: '/web-shell/php'
      },
      {
        technology: 'asp',
        url: '/web-shell/asp'
      }
    ]
    vi.spyOn(axios, 'get').mockResolvedValue(mockedTechnologies);

    // Mount the component
    const wrapper = mount(ShellSelectionScreen);

    // Wait until the DOM updates
    await flushPromises();

    // Expect an option group to have been created
    expect(wrapper.getComponent(OptionGroup).text()).toContain('WebShell Technologies');
  });

  it('Creates a BasicOptionComponent for each technology', async () => {
    // Mock the axios `get` method
    const mockedTechnologies = [
      {
        technology: 'php',
        url: '/web-shell/php'
      },
      {
        technology: 'asp',
        url: '/web-shell/asp'
      }
    ];
    vi.spyOn(axios, 'get').mockResolvedValue(mockedTechnologies);

    // Mount the component
    const wrapper = mount(ShellSelectionScreen);

    // Wait until the DOM updates
    await flushPromises();

    // Expect a BasicOptionComponent to have been created for each technology
    expect(wrapper.findAllComponents(BasicOptionComponent).map(c => c.text()).join()).toEqual('php,asp');
  });

  it('Initializes all BasicOptionComponent as Unselected', async () => {
    // Mock the axios `get` method
    const mockedTechnologies = [
      {
        technology: 'php',
        url: '/web-shell/php'
      },
      {
        technology: 'asp',
        url: '/web-shell/asp'
      }
    ];
    vi.spyOn(axios, 'get').mockResolvedValue(mockedTechnologies);

    // Mount the component
    const wrapper = mount(ShellSelectionScreen);

    // Wait until the DOM updates
    await flushPromises();

    // Click on each BasicOptionComponent once and expect them to 
    wrapper.findAllComponents(BasicOptionComponent).forEach((c) => {
      // Clickon the button
      c.find('button').trigger('click');

      // Expect the event to have been emitted
      expect(c.props('selected')).toBe(false);
    });
  });
});
