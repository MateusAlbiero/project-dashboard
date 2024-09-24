<template>
  <q-page class="row justify-evenly">
    Listagem de tarefas da organização {{ githubOrg?.name }}
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiGitHub } from 'src/services/githubService';

interface GitHubOrg {
  name: string;
}

interface GitHubRepos {
  name: string;
  login: string;
  id: number;
}

const githubOrg = ref<GitHubOrg | null>(null);
const githubRepos = ref<GitHubRepos | null>(null);


onMounted(async () => {
  try {
    const gitOrgs = await apiGitHub.get('/orgs/sgbrsist');
    githubOrg.value = gitOrgs.data;

    const gitRepos = await apiGitHub.get('/orgs/sgbrsist');
    githubRepos.value = gitRepos.data;
  } catch (error) {
    console.error('Erro ao retornar os dados da API: ', error);
  }
});
</script>