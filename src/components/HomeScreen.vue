<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const onNavigate = () => {
    router.push('/shell');
  };
</script>

<template>
  <div>
    <h1>Welcome to the Web Shell Generator!</h1>
    <p>
      This tool will guide you through the process of generating 
      a secure and modular web shell to use in CTFs, bug bounty programs or client 
      engagements.
    </p>
    <p>
      You will be able to select the features you want the shell to have, including
      some optional security features in addition to the default ones.
      The resulting web shell will be comprised of two elements:
    </p>
    <ul>
      <li>shell: this component will need to be uploaded to the target.</li>
      <li>client: this component will allow secure communication with the shell.</li>
    </ul>
    <button @click="onNavigate">Start</button>
  </div>
</template>
