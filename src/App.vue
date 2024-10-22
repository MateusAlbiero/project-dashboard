<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// import { apiClickUp } from './services/clickupService';
// import { apiGitHub } from './services/githubService';

// const clickupTasks = ref([]);
// const githubTasks = ref([]);

onMounted(async () => {
  try {
    // const githubResponse = await apiGitHub.get('/users'); //GitHub
    // githubTasks.value = githubResponse.data;

    // const clickupResponse = await apiClickUp.get(''); //ClickUp
    // clickupTasks.value = clickupResponse.data;
  } catch (error) {
    console.error('Erro ao retornar os dados da API: ', error);
  }
});

defineOptions({
  name: 'App'
});
</script>
