<template>
  <div class="q-pa-xl dashboard-container">
    <div class="flex-jb q-toolbar-title">
      <h4>Dashboard</h4>
    </div>

    <div class="q-mb-xl q-pa-xl modal-dashboard">
      <div class="q-mb-md">
        <div class="flex-jb flex-ac">
          <h5>Tarefas Concluídas</h5>
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
          :dense="$q.screen.lt.md"
          flat
          bordered
          :rows="filteredCompletedTasks"
          :columns="columns"
          row-key="protocol"
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

          <template #body="props">
            <q-tr>
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                @click="openTaskDetails(props.row)"
              >
                <template v-if="col.name === 'origin'">
                  <q-chip size="5px">
                    {{ $t(`origin.${col.value}`) }}
                    <q-tooltip>{{ $t(`origin.${col.value}`) }}</q-tooltip>
                  </q-chip>
                </template>
                <template v-else>
                  <span class="truncate inline-block max-w-[300px]">
                    {{ col.value }}
                    <q-tooltip>{{ col.value }}</q-tooltip>
                  </span>
                </template>
              </q-td>
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
          <h5>Tarefas Pendentes</h5>
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
          :dense="$q.screen.lt.md"
          flat
          bordered
          :rows="filteredPendingTasks"
          :columns="columns"
          row-key="protocol"
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

          <template #body="props">
            <q-tr>
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                @click="openTaskDetails(props.row)"
              >
                <template v-if="col.name === 'origin'">
                  <q-chip size="5px">
                    {{ $t(`origin.${col.value}`) }}
                    <q-tooltip>{{ $t(`origin.${col.value}`) }}</q-tooltip>
                  </q-chip>
                </template>
                <template v-else>
                  <span class="truncate inline-block max-w-[300px]">
                    {{ col.value }}
                    <q-tooltip>{{ col.value }}</q-tooltip>
                  </span>
                </template>
              </q-td>
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

    <q-dialog
      v-model="isDialogOpen"
      full-height
      full-width
      transition-show="scale"
      transition-hide="scale"
      class="mt-1"
      :inert="isDialogOpen"
    >
      <q-card class="q-pa-md">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Detalhes da Tarefa</div>
          <q-btn icon="close" flat round dense @click="isDialogOpen = false" />
          <q-space />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <h3>{{ selectedTask.name }}</h3>
          <div><strong>Prioridade:</strong> {{ selectedTask.priority?.priority || 'Não informado' }}</div>
          <div><strong>Responsável:</strong> {{ selectedTask.assignees?.[0]?.username || 'Não informado' }}</div>
          <div><strong>Protocolo:</strong> {{ selectedTask.custom_id }}</div>
          <div><strong>Status:</strong> {{ selectedTask.status?.status || 'Não informado' }}</div>
          <div><strong>Descrição:</strong> {{ selectedTask.description || 'Não informado' }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" @click="isDialogOpen = false" />
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
      { name: 'name', required: true, label: 'Descrição', align: 'left', field: row => row.name, sortable: true, maxWidth: '120px' },
      { name: 'custom_id', label: 'Protocolo', align: 'center', field: 'custom_id', sortable: true },
      { name: 'status', label: 'Status', align: 'center', field: row => row.status?.status || 'Não informado', sortable: true },
      { name: 'assignees.username', label: 'Responsável', align: 'center', field: row => row.assignees?.[0]?.username || 'Não informado', sortable: true },
      { name: 'priority', label: 'Prioridade', align: 'center', field: row => row.priority?.priority || 'Não informado', sortable: true },
    ];

    const filterCompletedTasks = ref('');
    const filterPendingTasks = ref('');
    const rows = ref([]);
    const selectedTask = ref({});
    const isDialogOpen = ref(false);

    const filteredCompletedTasks = computed(() => {
      return rows.value.filter(row => 
        row.space.id === '90130860103' &&
        (row.status.id === 'sc901303007954_qiBEkmhZ' || 
         row.status.id === 'sc901303007954_VhnEd1ez' || 
         row.status.id === 'sc901303007954_cq6ukTMC' || 
         row.status.id === 'sc901303007954_ywDMi6Jm') && 
        ((row.name && row.name.toLowerCase().includes(filterCompletedTasks.value.toLowerCase())) ||
         (row.custom_id && row.custom_id.toString().toLowerCase().includes(filterCompletedTasks.value.toLowerCase())))
      );
    });

    const filteredPendingTasks = computed(() => {
      return rows.value.filter(row => 
        row.space.id === '90130860103' &&
        (row.status.id === 'sc901303007954_tGoRmoEs' || 
         row.status.id === 'sc901303007954_GXKcfrH2' || 
         row.status.id === 'sc901303007954_IFDVes5B') &&
        ((row.name && row.name.toLowerCase().includes(filterPendingTasks.value.toLowerCase())) ||
         (row.custom_id && row.custom_id.toString().toLowerCase().includes(filterPendingTasks.value.toLowerCase())))
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
      isDialogOpen.value = true;
    };

    const formatValue = (value) => {
      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return value >= 0 ? formatter.format(value) : `- ${formatter.format(Math.abs(value))}`;
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
      formatValue,
    };
  }
}
</script>

<style scoped>
  @import 'src/css/style.css';
</style>