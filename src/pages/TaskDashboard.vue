<template>
  <div class="dashboard-container">
    <div class="flex-jb mt-1">
      <div class="q-pa-lg modal-dashboard">
        <div id="responsible-chart" style="height: 400px;"></div>
      </div>
      <div class="q-pa-lg modal-dashboard">
        <div id="status-chart" style="height: 400px;"></div>
      </div>
    </div>
    <div class="flex-jb">
      <div class="q-pa-lg modal-dashboard">
        <div class="q-mb-md">
          <div class="pending-tasks flex-jb flex-ac">
            <div class="mb-2 mt-2">
              <q-toolbar-title shrink style="font-size: 1.5rem;">Tarefas</q-toolbar-title>
              <div class="text-grey-8">Listagem de tarefas do SG Master</div>
            </div>
            <div>
              <q-input
                style="width: 400px;"
                outlined
                dense
                debounce="300"
                v-model="filterTasks"
                placeholder="Buscar..."
                hint="Busque qualquer tarefa por descrição, protocolo, status ou responsáveis."
                autofocus
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>

              <q-chip v-if="selectedStatus" removable v-model="selectedStatus" color="primary" text-color="white">
                {{ `Status: ${$t(`status.${selectedStatus}`)}` }}
              </q-chip>
              <q-chip  v-if="selectedResponsible" removable v-model="selectedResponsible" color="primary" text-color="white">
                {{ `Responsável: ${selectedResponsible}` }}
              </q-chip>
            </div>
          </div>

          <q-table
            :dense="$q.screen.lt.md"
            flat
            bordered
            :rows="filteredTasks"
            :columns="columns"
            :rows-per-page="10"
            :rows-per-page-options="[10]"
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
                          col.value === 'sc901303007954_tGoRmoEs', // aberto
                        'bg-red-8 text-white':
                          col.value === 'sc901303007954_GXKcfrH2', // pendente
                        'bg-orange-8 text-white':
                          col.value === 'sc901303007954_IFDVes5B', // em andamento
                        'bg-yellow-8 text-white':
                          col.value === 'sc901303007954_qiBEkmhZ', // em testes
                        'bg-blue-8 text-white':
                          col.value === 'sc901303007954_VhnEd1ez', // testado
                        'bg-green-8 text-white':
                          col.value === 'sc901303007954_cq6ukTMC', // finalizado
                        'bg-purple-8 text-white':
                          col.value === 'sc901303007954_ywDMi6Jm' // upado
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
                  <template v-else-if="col.name === 'tags'">
                    <q-chip
                      size="12px"
                      :class="'bg-blue-8 text-white'"
                    >
                      {{ props.row.tags.map(t => t.name.charAt(0).toUpperCase() + t.name.slice(1)).join(', ') || 'Vazio' }}
                      <q-tooltip>{{ props.row.tags.map(t => t.name.charAt(0).toUpperCase() + t.name.slice(1)).join(', ') || 'Vazio' }}</q-tooltip>
                    </q-chip>
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
              <q-card class="full-width q-pa-xs mb-05 mt-05">
                <q-card-section class="text-center">
                  <div>
                    <img src="/img/error/NotFound.png" width="150px" alt="Erro" class="error-image" />
                  </div>
                  <span class="text-primary" style="font-weight: bold;">Nenhum registro encontrado :(</span>
                </q-card-section>
              </q-card>
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
      { name: 'tags', label: 'Etiqueta', align: 'center', field: row => row.tags.map(t => t.name).join(', ') || 'Vazio', style: 'overflow: hidden; min-width: 150px; max-width: 150px; text-overflow: ellipsis;' },
      { name: 'custom_id', label: 'Protocolo', align: 'center', field: 'custom_id', width: '100px' },
      { name: 'status', label: 'Status', align: 'center', field: row => row.status?.id || 'Não informado', style: 'min-width: 150px; max-width: 150px;' },
      { name: 'responsible', label: 'Responsáveis', align: 'center', field: row => row.assignees.map(a => a.username).join(', ') || 'Não informado', style: 'overflow: hidden; min-width: 150px; max-width: 150px; text-overflow: ellipsis;' },
      { name: 'priority', label: 'Prioridade', align: 'center', field: row => row.priority?.priority || 'normal', width: '100px', style: 'min-width: 120px; max-width: 120px;' },
    ];

    const filterTasks = ref('');
    const rows = ref([]);
    const isLoading = ref(true);
    const selectedTask = ref({});
    const isDialogOpen = ref(false);
    const { t: $t } = i18n.global;
    const selectedStatus = ref(null);
    const selectedResponsible = ref(null);

    const filteredTasks = computed(() => {
      console.log('caiu aqui e vai filtrar pelas completas');
      
      return rows.value.filter(row =>
        row.space.id === '90130860103' &&
        (selectedStatus.value ? row.status.id === selectedStatus.value : true) &&
        (selectedResponsible.value ? row.assignees.some(assignee => assignee.username === selectedResponsible.value) : 'Não informado') &&
        ((row.name && row.name.toLowerCase().includes(filterTasks.value.toLowerCase())) ||
          (row.custom_id && row.custom_id.toString().toLowerCase().includes(filterTasks.value.toLowerCase())) ||
          (row.status.status && row.status.status.toString().toLowerCase().includes(filterTasks.value.toLowerCase())) ||
          (row.assignees.some(a => a.username.toLowerCase().includes(filterTasks.value.toLowerCase())))));
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
        renderChartStatus();
        renderChartResponsible();
      }
    };

    const renderChartStatus = () => {
      const statusCounts = rows.value.reduce((acc, task) => {
        const statusId = task.status?.id || 'Aberto';
        acc[statusId] = acc[statusId] ? acc[statusId] + 1 : 1;
        return acc;
      }, {});

      const chartData = Object.entries(statusCounts).map(([id, count]) => ({
        value: count,
        name: $t(`status.${id}`),
        id: id,
      }));

      const chartDom = document.getElementById('status-chart');
      const chartStatus = echarts.init(chartDom);

      const option = {
        title: {
          text: 'Status das tarefas',
          subtext: 'Gráfico de status por tarefas',
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
            radius: '70%',
            center: ['55%', '60%'],
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

      chartStatus.setOption(option);
      chartStatus.on('click', (params) => {
        filterTasksByStatus(params.data.id);
      });
    };

    const renderChartResponsible = () => {
      const responsibleCounts = rows.value.reduce((acc, task) => {
        const responsible = task.assignees && task.assignees.length > 0 ? task.assignees[0].username : 'Não informado';
        acc[responsible] = (acc[responsible] || 0) + 1;
        return acc;
      }, {});
      
      const chartDataResponsible = Object.entries(responsibleCounts).map(([responsible, count]) => ({
        value: count,
        name: responsible,
      }));

      const chartDom = document.getElementById('responsible-chart');
      const chartResponsible = echarts.init(chartDom);

      const option = {
        title: {
          text: 'Responsáveis das tarefas',
          subtext: 'Gráfico de responsáveis por tarefas',
          left: 'right',
          textAlign: 'center',
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
            name: 'Responsáveis',
            type: 'pie',
            radius: '60%',
            center: ['70%', '60%'],
            data: chartDataResponsible,
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

      chartResponsible.setOption(option);
      chartResponsible.on('click', (params) => {
        filterTasksByResponsible(params.name);
      });
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

    const filterTasksByStatus = (statusName) => {
      console.log('Status clicado foi: ', statusName);
      selectedStatus.value = statusName;
    };

    const filterTasksByResponsible = (responsibleName) => {
      console.log('Responsável clicado foi: ', responsibleName);
      selectedResponsible.value = responsibleName;
    };

    onMounted(() => {
      loadTasks();
    });

    return {
      rows,
      columns,
      filterTasks,
      filteredTasks,
      selectedStatus,
      selectedResponsible,
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