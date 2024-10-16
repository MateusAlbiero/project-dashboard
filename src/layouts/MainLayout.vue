<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white">
        <q-space />
        <div class="search-container">
          <q-btn
            align="between"
            icon="search"
            class="search-button"
            @click="openSearchModal"
          />
        </div>
        <q-space />
        <q-btn
          icon="logout"
          size="sm"
          @click="confirmLogout"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="searchDialog">
      <q-card class="card mh-200">
        <q-card-section>
          <q-input
            type="search"
            hint="Busque qualquer tarefa por descrição, protocolo, status ou responsáveis."
            class="q-dialog--xl"
            v-model="searchQuery"
            autofocus
            label="Pesquisar"
            @keyup.enter="performSearch"
            :disable="loading"
          />
          <q-spinner v-if="loading" />
        </q-card-section>

        <q-card-section>
          <div v-if="filteredTasks.length > 0">
            <q-list bordered>
              <q-item 
                v-for="(tarefa) in limitedFilteredTasks" 
                :key="tarefa.custom_id"
                clickable
              >
                <q-item-section>
                  <q-item-label>{{ tarefa.name }}</q-item-label>
                  <q-item-label caption>{{ tarefa.custom_id }} | {{tarefa.status ? tarefa.status.status : 'Aberto' }} | {{ tarefa.assignees.map(a => a.username).join(', ') || 'Não informado' }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div v-else-if="filteredTasks.length == 0 && !loading">
            <p class="text-center">Nenhum registro encontrado :(</p>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { apiClickUp } from 'src/services/clickupService';

interface Tarefa {
  custom_id: string;
  name: string;
  status: { status: string };
  assignees: { username: string }[];
  space: { id: string };
}

interface ClickUpResponse {
  tasks: Tarefa[];
  last_page: boolean;
}

const router = useRouter();
const $q = useQuasar();
const searchDialog = ref(false);
const searchQuery = ref('');
const loading = ref(false);
const rows = ref<Tarefa[]>([]);
const errorMessage = ref('');

const filteredTasks = computed(() =>
  rows.value.filter(row =>
    row.space.id === '90130860103' &&
    (
      (row.name && row.name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (row.custom_id && row.custom_id.toString().toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (row.status?.status && row.status.status.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (row.assignees.some(a => a.username.toLowerCase().includes(searchQuery.value.toLowerCase())))
    )
  )
);

const limitedFilteredTasks = computed(() => filteredTasks.value.slice(0, 5));

async function fetchTasks(query = '') {
  try {
    let page = 0;
    let hasMorePages = true;
    rows.value = [];
    errorMessage.value = '';

    while (hasMorePages) {
      const response = await apiClickUp.post<ClickUpResponse>('', {
        method: 'GET',
        url: `https://api.clickup.com/api/v2/list/901303007954/task?page=${page}`,
        params: { search: query },
      });

      rows.value.push(...response.data.tasks);
      hasMorePages = !response.data.last_page;
      page++;
    }
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    errorMessage.value = 'Erro ao buscar tarefas. Tente novamente.';
  }
}

function openSearchModal() {
  searchDialog.value = true;
}

async function performSearch() {
  if (searchQuery.value.trim() === '') return;

  loading.value = true;
  await fetchTasks(searchQuery.value);
  loading.value = false;
}

function confirmLogout() {
  $q.dialog({
    title: 'Encerrar sessão',
    message: 'Você realmente deseja sair?',
    cancel: true,
    persistent: true,
    ok: { label: 'Sair' },
  }).onOk(() => {
    logout();
  });
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  router.push('/login');
}
</script>

<style scoped>
  @import 'src/css/style.css';
</style>