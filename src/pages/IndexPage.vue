<template>
  <div class="q-pa-xl dashboard-container">
    <div class="flex-jb q-toolbar-title">
      <h4>Dashboard</h4>
    </div>
    <div class="q-mb-xl q-pa-xl modal-dashboard">
      <div class="q-mb-md">
        <div class="flex-jb flex-ac">
          <h5>Concluídas nos últimos 15 dias</h5>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filterLast15Days"
            placeholder="Buscar..."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <q-table
          class="my-sticky-dynamic"
          flat
          bordered
          :rows="filteredLast15Days"
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
          <h5>Nos próximos 15 dias</h5>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filterNext15Days"
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
          :rows="filteredNext15Days"
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

    <q-dialog v-model="isDialogOpen">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Detalhes da Tarefa</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <h3>{{ selectedTask.name }}</h3>
          <div>{{ selectedTask.description }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { apiGitHub } from 'src/services/githubService';

export default {
  setup() {
    const columns = [
      {
        name: 'name',
        required: true,
        label: 'Descrição',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true,
      },
      { name: 'priority', label: 'Prioridade', field: 'priority', sortable: true },
      { name: 'responsible', label: 'Responsável', field: 'responsible' },
      { name: 'protocol', label: 'Protocolo', field: 'protocol' },
      { name: 'deliveryTime', label: 'Prazo de entrega', field: 'deliveryTime' },
    ];

    const filterLast15Days = ref('');
    const filterNext15Days = ref('');
    const rowsLast15Days = ref([]);
    const rowsNext15Days = ref([]);
    const selectedTask = ref({});
    const isDialogOpen = ref(false);

    const filteredLast15Days = computed(() => {
      return rowsLast15Days.value.filter((row) =>
        Object.values(row).some((val) =>
          val.toString().toLowerCase().includes(filterLast15Days.value.toLowerCase())
        )
      );
    });

    const filteredNext15Days = computed(() => {
      return rowsNext15Days.value.filter((row) =>
        Object.values(row).some((val) =>
          val.toString().toLowerCase().includes(filterNext15Days.value.toLowerCase())
        )
      );
    });

    onMounted(async () => {
      try {
        const response = await apiGitHub.get('/orgs/sgbrsist/repos');
        const tasks = response.data;

        rowsLast15Days.value = tasks.filter(task => task.period === 'last15Days');
        rowsNext15Days.value = tasks.filter(task => task.period === 'next15Days');
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    });

    const openTaskDetails = (task) => {
      selectedTask.value = task;
      isDialogOpen.value = true;
    };

    return {
      columns,
      filterLast15Days,
      filterNext15Days,
      filteredLast15Days,
      filteredNext15Days,
      selectedTask,
      isDialogOpen,
      openTaskDetails,
    };
  }
}
</script>

<style scoped>
  @import 'src/css/style.css';
</style>