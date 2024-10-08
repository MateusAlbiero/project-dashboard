<template>
  <div class="q-pa-xl dashboard-container">
    <div class="flex-jb q-toolbar-title">
      <h4>Dashboard</h4>
    </div>

    <div class="q-mb-xl q-pa-xl modal-dashboard">
      <div class="q-mb-md">
        <div class="flex-jb flex-ac">
          <h5>Todas as Tarefas Concluídas</h5>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filterCompletedTasks"
            placeholder="Buscar..."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <q-table
          flat
          bordered
          :rows="filteredCompletedTasks"
          :columns="columns"
          row-key="protocol"
          @row-click="openTaskDetails"
        >
          <template v-slot:header="props">
            <q-tr :props="props" class="bg-primary text-white">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:no-data>
            <div class="full-width row justify-center items-center q-pa-md">
              Nenhum registro encontrado :(
            </div>
          </template>
        </q-table>
      </div>
    </div>

    <div class="q-pa-xl modal-dashboard my-sticky-dynamic">
      <div class="q-mb-md">
        <div class="flex-jb flex-ac">
          <h5>Todas as Tarefas Pendentes</h5>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filterPendingTasks"
            placeholder="Buscar..."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <q-table
          flat
          bordered
          :rows="filteredPendingTasks"
          :columns="columns"
          row-key="protocol"
          @row-click="openTaskDetails"
        >
          <template v-slot:header="props">
            <q-tr :props="props" class="bg-primary text-white">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:no-data>
            <div class="full-width full-height row justify-center items-center">
              Nenhum registro encontrado :(
            </div>
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog v-model="isDialogOpen" full-height full-width transition-show="scale" transition-hide="scale" class="mt-1">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Detalhes da Tarefa</div>
          <q-btn icon="close" flat round dense v-close-popup />
          <q-space />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <h3>{{ selectedTask.name }}</h3>
          <div>teste</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { apiClickUp } from 'src/services/clickupService';

export default {
  setup() {
    const columns = [
      { name: 'name', required: true, label: 'Descrição', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true, maxWidth: '120px' },
      { name: 'priority', label: 'Prioridade', field: row => row.priority?.priority || 'N/A', sortable: true },
      { name: 'assignees.username', label: 'Responsável', field: row => row.assignees?.[0]?.username || 'Não informado' },
      { name: 'custom_id', label: 'Protocolo', field: 'custom_id' },
      { name: 'status', label: 'Status', field: row => row.status?.status || 'N/A' },
    ];

    const filterCompletedTasks = ref('');
    const filterPendingTasks = ref('');
    const rows = ref([]);
    const selectedTask = ref({});
    const isDialogOpen = ref(false);
    const current = ref(3);

    const filteredCompletedTasks = computed(() => {
      return rows.value.filter(row => 
        (row.status.status === 'em testes' || row.status.status === 'em aprovação' || row.status.status === 'finalizado') && 
        row.status.status !== 'to do' && (
          (row.name && row.name.toLowerCase().includes(filterCompletedTasks.value.toLowerCase())) ||
          (row.custom_id && row.custom_id.toString().toLowerCase().includes(filterCompletedTasks.value.toLowerCase()))
        )
      );
    });

    const filteredPendingTasks = computed(() => {
      return rows.value.filter(row => 
        (row.status.status === 'pendente' || row.status.status === 'aberto') && (
          (row.name && row.name.toLowerCase().includes(filterPendingTasks.value.toLowerCase())) ||
          (row.custom_id && row.custom_id.toString().toLowerCase().includes(filterPendingTasks.value.toLowerCase()))
        )
      );
    });

    onMounted(async () => {
      try {
        const response = await apiClickUp.post('', {
          method: 'GET',
          url: 'https://api.clickup.com/api/v2/team/31136150/task',
        });

        rows.value = response.data.tasks;
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    });

    const openTaskDetails = (task) => {
      selectedTask.value = task;
      console.log(task);
      isDialogOpen.value = true;
    };

    return {
      columns,
      filterCompletedTasks,
      filterPendingTasks,
      filteredCompletedTasks,
      filteredPendingTasks,
      selectedTask,
      isDialogOpen,
      openTaskDetails,
      current,
    };
  }
}
</script>

<style scoped>
@import 'src/css/style.css';
</style>