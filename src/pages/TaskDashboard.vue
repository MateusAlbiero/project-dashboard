<template>
  <div class="dashboard-container">
    <div id="status-chart" style="height: 400px;"></div>
    <div class="flex-jb">
      <div class="q-mb-xl q-pa-xl modal-dashboard">
        <div class="q-mb-md">
          <div class="pending-tasks flex-jb flex-ac">
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
              <q-tr class="cursor-pointer" @click="openTaskDetails(props.row)">
                <q-td
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
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
          <div class="pending-tasks flex-jb flex-ac">
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
              <q-tr class="cursor-pointer" @click="openTaskDetails(props.row)">
                <q-td
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
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
            <TaskDetails :task="selectedTask" />
          </q-card-section>

          <q-card-actions class="justify-center mt-2">
            <q-btn push align="between" color="primary" label="Abrir tarefa no ClickUp" icon="open_in_new" @click="openClickUp(selectedTask.url)" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import * as echarts from 'echarts';
import { apiClickUp } from 'src/services/clickupService';
import TaskDetails from 'src/components/TaskDetails.vue';
import { i18n } from 'src/boot/i18n';

export default {
  components: {
    TaskDetails
  },
  setup() {
    const $q = useQuasar();
    const columns = [
      { name: 'name', label: 'Descrição', align: 'left', field: row => row.name,  style: 'overflow: hidden; min-width: 300px; max-width: 300px; text-overflow: ellipsis;' },
      { name: 'custom_id', label: 'Protocolo', align: 'center', field: 'custom_id', width: '100px' },
      { name: 'status', label: 'Status', align: 'center', field: row => row.status?.id || 'Não informado', style: 'min-width: 150px; max-width: 150px;' },
      { name: 'responsible', label: 'Responsáveis', align: 'center', field: row => row.assignees.map(a => a.username).join(', ') || 'Não informado', style: 'overflow: hidden; min-width: 150px; max-width: 150px; text-overflow: ellipsis;' },
      { name: 'priority', label: 'Prioridade', align: 'center', field: row => row.priority?.priority || 'normal', width: '100px', style: 'min-width: 120px; max-width: 120px;' },
    ];

    const filterCompletedTasks = ref('');
    const filterPendingTasks = ref('');
    const rows = ref([]);
    const isLoading = ref(true);
    const selectedTask = ref({});
    const isDialogOpen = ref(false);
    const { t: $t } = i18n.global;

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

    const loadTasks = async () => {
      try {
        $q.loading.show();
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
      } finally {
        $q.loading.hide();
        isLoading.value = false;
        renderChart();
      }
    };

    const renderChart = () => {
      const statusCounts = rows.value.reduce((acc, task) => {
        const status = task.status?.id ? $t(`status.${task.status?.id}`) : 'Aberto';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(statusCounts).map(([status, count]) => ({
        value: count,
        name: status,
      }));

      const chartDom = document.getElementById('status-chart');
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: 'Status das Tarefas',
          subtext: 'Gráfico de tarefas com seus respectivos status',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: 'Status',
            type: 'pie',
            radius: '60%',
            data: chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    };

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

    const openClickUp = (url) => {
      if (url) {
        window.open(url, '_blank');
      } else {
        console.log('URL inválida');
      }
    };

    onMounted(() => {
      loadTasks();
    });

    return {
      rows,
      columns,
      filterCompletedTasks,
      filterPendingTasks,
      filteredCompletedTasks,
      filteredPendingTasks,
      selectedTask,
      isDialogOpen,
      openTaskDetails,
      formatValue,
      openClickUp,
    };
  }
}
</script>

<style scoped>
  @import 'src/css/style.css';
</style>