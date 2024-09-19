<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiGitHub } from './services/githubService';
// import { apiClickUp } from './services/clickupService';

// const clickupTasks = ref([]);
const githubTasks = ref([]);

onMounted(async () => {
  try {
    const githubResponse = await apiGitHub.get(''); //GitHub
    githubTasks.value = githubResponse.data;

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
