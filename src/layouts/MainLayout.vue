<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Painel de Tarefas
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Acessos Rápidos
        </q-item-label>

        <q-item clickable v-ripple @click="navigateTo('github')">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>GitHub</q-item-label>
            <q-item-label caption>Visualizar tarefas do GitHub</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('clickup')">
          <q-item-section avatar>
            <q-icon name="task" />
          </q-item-section>
          <q-item-section>
            <q-item-label>ClickUp</q-item-label>
            <q-item-label caption>Visualizar tarefas do ClickUp</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
            <q-item-label caption>Encerrar sessão</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const leftDrawerOpen = ref(false);
const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function navigateTo(platform: string) {
  if (platform === 'github') {
    window.open('https://github.com/sgbrsist', '_blank');
  } else if (platform === 'clickup') {
    window.open('https://app.clickup.com', '_blank');
  }
}

function logout() {
  console.log('Usuário saiu');
  router.push('/login');
}
</script>
