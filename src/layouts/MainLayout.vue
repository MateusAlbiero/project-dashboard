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
      <q-card class="card h-200">
        <q-card-section>
          <q-input
            type="search"
            hint="Busque qualquer tarefa por descrição, protocolo, status ou responsáveis."
            class="q-dialog--xl"
            v-model="searchQuery"
            autofocus
            label="Pesquisar"
            @keyup.enter="performSearch"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();
const searchDialog = ref(false);
const searchQuery = ref('');

function openSearchModal() {
  searchDialog.value = true;
}

function performSearch() {

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