<template>
  <div class="q-pa-xl dashboard-container">
    <div class="flex-jb q-toolbar-title">
      <h4>Dashboard</h4>
    </div>
    <div>
      <div class="q-mb-xl q-pa-xl modal-dashboard">
        <div class="q-mb-md">
          <div class="flex-jb flex-ac">
            <h5>Tarefas concluídas</h5>
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
            :rows-per-page="5"
            :rows-per-page-options="[5]"
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
                  <template v-if="col.name === 'status'">
                    <q-chip
                      size="12px"
                      :class="{
                        'bg-orange-8 text-white':
                          col.value === 'sc901303007954_qiBEkmhZ',
                        'bg-yellow-8 text-white':
                          col.value === 'sc901303007954_VhnEd1ez',
                        'bg-blue-8 text-white':
                          col.value === 'sc901303007954_qiBEkmhZ',
                        'bg-green-8 text-white':
                          col.value === 'sc901303007954_cq6ukTMC'
                      }"
                    >
                      {{ col.value ? $t(`status.${col.value}`) : 'Aberto' }}
                      <q-tooltip>{{ col.value ? $t(`status.${col.value}`) : 'Aberto' }}</q-tooltip>
                    </q-chip>
                  </template>
                  <template v-else-if="col.name === 'priority'">
                    <q-chip
                      size="12px"
                      :class="{
                        'bg-red-8 text-white':
                          col.value === 'urgent',
                        'bg-yellow-8 text-white':
                          col.value === 'pending',
                        'bg-green-9 text-white':
                          col.value === 'completed',
                        'bg-orange-8 text-white':
                          col.value === 'high',
                        'bg-gray text-black':
                          col.value === 'low',
                        'bg-blue-8 text-white':
                          col.value === 'normal',
                      }"
                    >
                      {{ col.value ? $t(`priority.${col.value}`) : 'Normal' }}
                      <q-tooltip>{{ col.value ? $t(`priority.${col.value}`) : 'Normal' }}</q-tooltip>
                    </q-chip>
                  </template>
                  <template v-else-if="col.name === 'assignees.username'">
                    <span>
                      {{ props.row.assignees.map(a => a.username).join(', ') || 'Não informado' }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="truncate">
                      {{ col.value }}
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
            <h5>Tarefas pendentes</h5>
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
            :rows-per-page="5"
            :rows-per-page-options="[5]"
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
                  <template v-if="col.name === 'status'">
                    <q-chip
                      size="12px"
                      :class="{
                        'bg-gray text-black':
                          col.value === 'sc901303007954_tGoRmoEs',
                        'bg-purple-8 text-white':
                          col.value === 'sc901303007954_GXKcfrH2',
                        'bg-orange-8 text-white':
                          col.value === 'sc901303007954_IFDVes5B'
                      }"
                    >
                      {{ col.value ? $t(`status.${col.value}`) : 'Aberto' }}
                      <q-tooltip>{{ col.value ? $t(`status.${col.value}`) : 'Aberto' }}</q-tooltip>
                    </q-chip>
                  </template>
                  <template v-else-if="col.name === 'priority'">
                    <q-chip
                      size="12px"
                      :class="{
                        'bg-red-8 text-white':
                          col.value === 'urgent',
                        'bg-yellow-8 text-white':
                          col.value === 'pending',
                        'bg-green-9 text-white':
                          col.value === 'completed',
                        'bg-orange-8 text-white':
                          col.value === 'high',
                        'bg-gray text-black':
                          col.value === 'low',
                        'bg-blue-8 text-white':
                          col.value === 'normal',
                      }"
                    >
                      {{ col.value ? $t(`priority.${col.value}`) : 'Normal' }}
                      <q-tooltip>{{ col.value ? $t(`priority.${col.value}`) : 'Normal' }}</q-tooltip>
                    </q-chip>
                  </template>
                  <template v-else-if="col.name === 'assignees.username'">
                    <span>
                      {{ props.row.assignees.map(a => a.username).join(', ') || 'Não informado' }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="truncate">
                      {{ col.value }}
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
    </div>

    <q-dialog
      v-model="isDialogOpen"
      full-height
      full-width
      transition-show="scale"
      transition-hide="scale"
      class="mt-1"
      :inert="!isDialogOpen"
    >

      <q-card class="q-pa-md">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h5">Detalhes da tarefa</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="isDialogOpen = false" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <h3>{{ selectedTask.name }}</h3>
          <div><strong>Prioridade:</strong> {{ selectedTask.priority?.priority || 'Não informado' }}</div>
          <div><strong>Responsáveis:</strong> {{ selectedTask.assignees.map(a => a.username).join(', ') || 'Não informado' }}</div>
          <div><strong>Protocolo:</strong> {{ selectedTask.custom_id }}</div>
          <div><strong>Status:</strong> {{ selectedTask.status?.status || 'Não informado' }}</div>
          <div><strong>Descrição:</strong> {{ selectedTask.description || 'Não informado' }}</div>
        </q-card-section>

        <q-card-actions>
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
      { name: 'name', required: true, label: 'Descrição', align: 'left', field: row => row.name, sortable: true, class: 'truncate ', style: 'overflow: hidden; max-width: 400px; text-overflow: ellipsis;' },
      { name: 'custom_id', label: 'Protocolo', align: 'center', field: 'custom_id', sortable: true },
      { name: 'status', label: 'Status', align: 'center', field: row => row.status?.id || 'Não informado', sortable: true },
      { name: 'responsible', label: 'Responsáveis', align: 'center', field: row => row.assignees.map(a => a.username).join(', ') || 'Não informado', sortable: true },
      { name: 'priority', label: 'Prioridade', align: 'center', field: row => row.priority?.priority || 'normal', sortable: true },
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
         (row.custom_id && row.custom_id.toString().toLowerCase().includes(filterCompletedTasks.value.toLowerCase())) ||
         (row.status.status && row.status.status.toString().toLowerCase().includes(filterCompletedTasks.value.toLowerCase())) ||
         (row.assignees.some(a => a.username.toLowerCase().includes(filterCompletedTasks.value.toLowerCase())))
        )
      );
    });

    const filteredPendingTasks = computed(() => {
      return rows.value.filter(row => 
        row.space.id === '90130860103' &&
        (row.status.id === 'sc901303007954_tGoRmoEs' || 
         row.status.id === 'sc901303007954_GXKcfrH2' || 
         row.status.id === 'sc901303007954_IFDVes5B') &&
         ((row.name && row.name.toLowerCase().includes(filterPendingTasks.value.toLowerCase())) ||
         (row.custom_id && row.custom_id.toString().toLowerCase().includes(filterPendingTasks.value.toLowerCase())) ||
         (row.status.status && row.status.status.toString().toLowerCase().includes(filterPendingTasks.value.toLowerCase())) ||
         (row.assignees.some(a => a.username.toLowerCase().includes(filterPendingTasks.value.toLowerCase())))
        )
      );
    });

    onMounted(async () => {
      try {
        let page = 0;
        let hasMorePages = true;

        while (hasMorePages) {
          const response = await apiClickUp.post('', {
            method: 'GET',
            url: `https://api.clickup.com/api/v2/list/901303007954/task?page=${page}`,
          });          
          rows.value.push(...response.data.tasks);

          hasMorePages = response.data.last_page === false;
          page++;
        }
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