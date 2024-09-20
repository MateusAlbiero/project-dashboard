<template>
  <q-page class="row items-center justify-evenly">
    
    Dados da organização: {{ githubOrg }}

  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiGitHub } from 'src/services/githubService';

const githubOrg = ref([]);

onMounted(async () => {
  try {
    const gitOrgs = await apiGitHub.get('/orgs/sgbrsist');
    githubOrg.value = gitOrgs.data;
  } catch (error) {
    console.error('Erro ao retornar os dados da API: ', error);
  }
});
</script>