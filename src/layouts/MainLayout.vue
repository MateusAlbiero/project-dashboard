<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="flex items-center">
          <q-icon name="dashboard" size="30px" class="q-mr-sm" />
          Dashboard
        </q-toolbar-title>
        <div class="search-container">
          <q-btn
            align="left"
            icon="search"
            class="search-button text-grey-4 q-font-light"
            @click="openSearchModal"
            label="Pesquisar"
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
            placeholder="Pesquisar..."
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
                @click="openTaskDetails(tarefa)"
              >
                <q-item-section>
                  <q-item-label>{{ tarefa.name }}</q-item-label>
                  <q-item-label caption>
                    {{ tarefa.custom_id }} | {{ tarefa.status ? tarefa.status.status : 'Aberto' }} | {{ tarefa.assignees.map(a => a.username).join(', ') || 'Não informado' }}
                  </q-item-label>
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

    <q-dialog
      v-model="isDialogOpen"
      full-height
      transition-show="scale"
      transition-hide="scale"
      class="mt-1"
      :inert="!isDialogOpen"
    >
      <q-card class="q-pa-md card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-grey-8">Detalhes da tarefa</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="isDialogOpen = false" />
        </q-card-section>

        <q-card-section class="q-pt-none mr-4 ml-4">
          <TaskDetails v-if="selectedTask" :task="selectedTask" />
        </q-card-section>

        <q-card-actions class="justify-center mt-2">
          <q-btn 
            push 
            align="between" 
            color="primary" 
            label="Abrir tarefa no ClickUp" 
            icon="open_in_new" 
            @click="openClickUp(selectedTask?.url)" 
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { apiClickUp } from 'src/services/clickupService';
import TaskDetails from 'src/components/TaskDetails.vue';

interface Tarefa {
  custom_id: string;
  name: string;
  status: { status: string };
  assignees: { username: string }[];
  space: { id: string };
  url: string;
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
const selectedTask = ref<Tarefa | null>(null);
const isDialogOpen = ref(false);

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

const openTaskDetails = (task: Tarefa) => {
  selectedTask.value = task;
  isDialogOpen.value = true;
};

const openClickUp = (url: string | undefined) => {
  if (url) {
    window.open(url, '_blank');
  } else {
    console.log('URL inválida');
  }
};
</script>

<style scoped>
  @import 'src/css/style.css';
</style>