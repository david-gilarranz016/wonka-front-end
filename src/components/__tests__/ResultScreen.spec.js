import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import axios from 'axios';

import ResultScreen from '../ResultScreen.vue';
import { GenerationRequest } from '../GenerationRequest.js';
import { useRouter } from 'vue-router';
import { APIResponse } from '../APIResponse';

// Mocks required for the tests
const mockedResponse = {
  "shell": {
    "url": "/output/3ea115a03afa09aa3fee61a882760812.php",
    "checksum": {
      "algorithm": "SHA256",
      "value": "9dff28c57d3e32a21c85089288b748a43d5092e9efa09a40ff0a49ffbb848453"
    }
  },
  "client": {
    "url": "/output/8afb9e15311a883e707633b141c78a21.rb",
    "checksum": {
      "algorithm": "SHA256",
      "value": "f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2"
    }
  }
}

// Mock the Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

describe('ResultScreen', () => {
  beforeEach(() => {
    // Set a client technology for the generation request
    GenerationRequest.setClientTechnology('python');

    // Add dependencies for said technology
    APIResponse.dependencies.python = '/dependencies/requirements.txt';
  });

  afterEach(() => {
    // Reset the generation request and the APIResponse object
    GenerationRequest.reset();
    APIResponse.dependencies = {};
  });

  it('Sends the GenerationRequest to the backend', async () => {
    await mockAxiosAndCreateWrapper();

    expect(axios.post).toHaveBeenCalledExactlyOnceWith(`${import.meta.env.VITE_API_BASE}/generator`, GenerationRequest.request);
  });

  it('If an error happens, shows an error message', async () => {
    const wrapper = await mockAxiosAndCreateWrapper(false);

    expect(wrapper.text()).toContain('An error has occurred');
  });

  it('Does not show the error message if no error happens', async () => {
    const wrapper = mount(ResultScreen);

    expect(wrapper.text()).not.toContain('An error has occurred');
  });

  it('If successfull, shows shell checksum', async() => {
    const wrapper =  await mockAxiosAndCreateWrapper();

    expect(wrapper.text()).toContain(mockedResponse.shell.checksum.algorithm);
    expect(wrapper.text()).toContain(mockedResponse.shell.checksum.value);
  });

  it('If successfull, show shell download link', async () => {
    const wrapper =  await mockAxiosAndCreateWrapper();

    expect(wrapper.findAll('a')[0].attributes('href')).toEqual(`${import.meta.env.VITE_API_BASE}${mockedResponse.shell.url}`);
  });

  it('Opens shell download link in new tab', async () => {
    const wrapper =  await mockAxiosAndCreateWrapper();

    expect(wrapper.findAll('a')[0].attributes('target')).toEqual('_blank');
  });

  it('If successfull, shows client checksum', async () => {
    const wrapper =  await mockAxiosAndCreateWrapper();

    expect(wrapper.text()).toContain(mockedResponse.client.checksum.algorithm);
    expect(wrapper.text()).toContain(mockedResponse.client.checksum.value);
  });

  it('If successfull, show client download link', async () => {
    const wrapper =  await mockAxiosAndCreateWrapper();

    expect(wrapper.findAll('a')[1].attributes('href')).toEqual(`${import.meta.env.VITE_API_BASE}${mockedResponse.client.url}`);
  });

  it('Opens client download link in new tab', async () => {
    const wrapper =  await mockAxiosAndCreateWrapper();

    expect(wrapper.findAll('a')[1].attributes('target')).toEqual('_blank');
  });

  it('If successfull, show client dependencies link', async () => {
    const wrapper =  await mockAxiosAndCreateWrapper();

    expect(wrapper.findAll('a')[2].attributes('href')).toEqual(`${import.meta.env.VITE_API_BASE}/dependencies/requirements.txt`);
  });

  it('Opens client dependencies link in new tab', async () => {
    const wrapper =  await mockAxiosAndCreateWrapper();

    expect(wrapper.findAll('a')[2].attributes('target')).toEqual('_blank');
  });

  it('Allows starting over the process', async () => {
    // Provide a mock implementation for the router.push method
    const push = vi.fn();
    useRouter.mockImplementationOnce(() => ({ push }) );

    const wrapper =  await mockAxiosAndCreateWrapper();

    // Find and click the button that returns to the main screen
    wrapper.find('button').trigger('click');

    expect(push).toHaveBeenCalledExactlyOnceWith('/');
  });

  it('When stating over resets the GenerationRequest', async () => {
    // Provide a mock implementation for the router.push method
    const push = vi.fn();
    useRouter.mockImplementationOnce(() => ({ push }) );

    const wrapper =  await mockAxiosAndCreateWrapper();

    // Find and click the button that returns to the main screen
    wrapper.find('button').trigger('click');

    expect(GenerationRequest.request).toEqual({
      shell: '',
      client: '',
      features: [],
      output: {
        format: ''
      }
    });
  });
});


async function mockAxiosAndCreateWrapper(success = true) {
  // Mock the axios `post` method
  if (success) {
    vi.spyOn(axios, 'post').mockResolvedValue({ data: mockedResponse });
  } else {
    vi.spyOn(axios, 'post').mockRejectedValue();
  }

  // Mount the component
  const wrapper = mount(ResultScreen);

  // Wait until the DOM updates
  await flushPromises();

  // Return the wrapper
  return wrapper;
}
