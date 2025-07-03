<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const onNavigate = () => {
    router.push('/shell');
  };
</script>

<template>
  <div>
    <h1 class="title">Welcome to the Web Shell Generator!</h1>
    <p class="mb-3 leading-normal">
      This tool will guide you through the process of generating 
      a secure and modular web shell to use in CTFs, bug bounty programs or client 
      engagements.
    </p>
    <p class="mb-3 leading-normal">
      You will be able to select the features you want the shell to have, including
      some optional security features in addition to the default ones.
      The resulting web shell will be comprised of two elements:
    </p>
    <ul class="list">
        <li><span class="emphasize">Shell</span> - this component will need to be uploaded to the target.</li>
        <li><span class="text-cyan-400 font-semibold">Client</span> - this component will allow secure communication with the shell.</li>
    </ul>
    <div class="mt-5 flex justify-center">
        <button class="btn" @click="onNavigate">Start</button>
    </div>
  </div>
</template>
