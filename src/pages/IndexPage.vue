<template>
  <div class="q-pa-xl dashboard-container">
    <div class="flex-jb">
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
          flat
          bordered
          :rows="filteredLast15Days"
          :columns="columns"
          row-key="protocol"
        >
          <template v-slot:no-data>
            Nenhum registro encontrado :(
          </template>
        </q-table>
      </div>
    </div>
    <div class="q-pa-xl modal-dashboard">
      <div class="q-mb-md">
        <div class="flex-jb flex-ac">
          <h5>Nos próximos 15 dias</h5>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filterNext15Days"
            placeholder="Pesquisar por descrição, protocolo ou responsável"
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
          header-class="blue-header"
        >
          <template v-slot:no-data>
            Nenhum registro encontrado :(
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Descrição',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'priority', label: 'Prioridade', field: 'priority', sortable: true },
  { name: 'responsible', label: 'Responsável', field: 'responsible' },
  { name: 'protocol', label: 'Protocolo', field: 'protocol' },
  { name: 'deliveryTime', label: 'Prazo de entrega', field: 'deliveryTime' },
];

const rowsLast15Days = [
  {
    name: 'Criar opção pra zerar demais impostos',
    priority: 'Urgente',
    responsible: 'João, Maria',
    protocol: '56561321',
    deliveryTime: '08/10/2005',
  },
];

const rowsNext15Days = [
  {
    name: 'Erro ao finalizar venda com produto com grade',
    priority: 'Não informada',
    responsible: 'Ana, Marcos',
    protocol: '56561321',
    deliveryTime: '08/10/2005',
    status: 'Pendente',
  },
];

export default {
  setup() {
    const filterLast15Days = ref('');
    const filterNext15Days = ref('');

    const filteredLast15Days = computed(() => {
      return rowsLast15Days.filter((row) =>
        Object.values(row).some((val) =>
          val.toString().toLowerCase().includes(filterLast15Days.value.toLowerCase())
        )
      );
    });

    const filteredNext15Days = computed(() => {
      return rowsNext15Days.filter((row) =>
        Object.values(row).some((val) =>
          val.toString().toLowerCase().includes(filterNext15Days.value.toLowerCase())
        )
      );
    });

    return {
      columns,
      filterLast15Days,
      filterNext15Days,
      filteredLast15Days,
      filteredNext15Days
    };
  }
}
</script>

<style scoped>
  @import 'src/css/style.css';
</style>
