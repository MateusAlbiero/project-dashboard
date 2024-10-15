<template>
  <div class="q-pa-xl dashboard-container">
    <div class="flex-jb q-toolbar-title">
      <h4>Dashboard</h4>
    </div>
    <div>
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
          <div class="text-h5 mb-2 mt-4">{{ selectedTask.name }}</div>
          <div class="flex-jb">
            <div class="flex-js">
              <section class="details-task">
                <strong class="mb-05"><q-icon name="description" class="mr-05"/>Protocolo</strong>
                <strong class="mb-05"><q-icon name="info" class="mr-05"/>Status</strong>
                <strong class="mb-05"><q-icon name="label" class="mr-05"/>Etiquetas</strong>
                <strong class="mb-05"><q-icon name="phone_in_talk" class="mr-05"/>Contato parceiro</strong>
              </section>
              <section>
                <div>{{ selectedTask.custom_id ? selectedTask.custom_id : 'Sem protocolo' }}</div>
                <div>
                  <q-chip
                    size="12px"
                    :class="{
                      'bg-orange-8 text-white':
                        selectedTask.status?.id === 'sc901303007954_qiBEkmhZ',
                      'bg-yellow-8 text-white':
                        selectedTask.status?.id === 'sc901303007954_VhnEd1ez',
                      'bg-blue-8 text-white':
                        selectedTask.status?.id === 'sc901303007954_qiBEkmhZ',
                      'bg-green-8 text-white':
                        selectedTask.status?.id === 'sc901303007954_cq6ukTMC',
                      'bg-gray text-black':
                        selectedTask.status?.id === 'sc901303007954_tGoRmoEs',
                      'bg-purple-8 text-white mb-05':
                        selectedTask.status?.id === 'sc901303007954_GXKcfrH2',
                      'bg-orange-8 text-white':
                        selectedTask.status?.id === 'sc901303007954_IFDVes5B'
                    }"
                  >
                    {{ selectedTask.status?.id ? $t(`status.${selectedTask.status?.id}`) : 'Aberto' }}
                  </q-chip>
                </div>
                <span v-if="selectedTask.tags && selectedTask.tags.length > 0">
                  <span v-for="tag in selectedTask.tags" :key="tag.name">
                    <q-chip
                        size="12px"
                        :class="'bg-blue-8 text-white'"
                    >
                      {{ tag.name }}
                    </q-chip>
                  </span>
                </span>
                <span v-else><div class="mb-05">Vazio</div></span>
                <div>
                {{ selectedTask.custom_fields ? 
                  (selectedTask.custom_fields.find(field => field.id === 'c019146b-e58d-4351-a0e2-23eb2bc94ffd')?.value || 'Não informado') 
                  : 'Não informado' }} 
                </div>
              </section>
            </div>
            <div class="flex-js">
              <section class="details-task">
                <strong class="mb-05"><q-icon name="supervisor_account" class="mr-05"/>Responsáveis</strong>
                <strong class="mb-05"><q-icon name="flag" class="mr-05"/>Prioridade</strong>
                <strong class="mb-05"><q-icon name="build" class="mr-05"/>Técnico responsável</strong>
                <strong class="mb-05"><q-icon name="headset" class="mr-05"/>Equipe suporte</strong>
              </section>
              <section>
                <div> {{ selectedTask.assignees.map(a => a.username).join(', ') || 'Não informado' }} </div>
                <div class="mb-025">
                  <q-chip
                    size="12px"
                    :class="{
                      'bg-red-8 text-white': selectedTask.priority?.priority === 'urgent',
                      'bg-yellow-8 text-white': selectedTask.priority?.priority === 'pending',
                      'bg-green-9 text-white': selectedTask.priority?.priority === 'completed',
                      'bg-orange-8 text-white': selectedTask.priority?.priority === 'high',
                      'bg-gray text-black': selectedTask.priority?.priority === 'low',
                      'bg-blue-8 text-white': selectedTask.priority?.priority === 'normal',
                      'bg-blue-8 text-white': selectedTask.priority?.priority === undefined
                    }"
                  >
                    {{ selectedTask.priority ? $t(`priority.${selectedTask.priority?.priority}`) : 'Normal' }}
                  </q-chip>
                </div>
                <div class="mb-05">
                  {{ selectedTask.custom_fields ? 
                    (selectedTask.custom_fields.find(field => field.id === '74deb46b-1412-4c18-85b3-d029aa21c523')?.value || 'Não informado') 
                    : 'Não informado' }} 
                </div>
                <div>
                  {{ selectedTask.custom_fields ? 
                    (selectedTask.custom_fields.find(field => field.id === '05fd1448-a109-48ad-8075-7e478f0c3712')?.type_config.options[selectedTask.custom_fields.find(field => field.id === '05fd1448-a109-48ad-8075-7e478f0c3712')?.value]?.name || 'Não informado') 
                    : 'Não informado' }} 
                </div>
              </section>
            </div>
          </div>
          <section class="mt-3 text-grey-8">Descrição</section>
          <q-scroll-area class="description-div q-pa-md q-mt-md q-border-radius" style="height: 300px;">
            <div>
              <div v-for="(line, index) in selectedTask.description.split('\n')" :key="index">
                {{ line }}
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>

        <q-card-actions class="justify-center mt-2">
          <q-btn push align="between" color="primary" label="Abrir tarefa no ClickUp" icon="open_in_new" @click="openClickUp(selectedTask.url)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { apiClickUp } from 'src/services/clickupService';

export default {
  setup() {
    const $q = useQuasar();
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
    const isLoading = ref(true);
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

    const openClickUp = (url) => {
      if (url) {
        window.open(url, '_blank');
      } else {
        console.log('URL inválida');
      }
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
      openClickUp,
    };
  }
}
</script>

<style scoped>
  @import 'src/css/style.css';
</style>