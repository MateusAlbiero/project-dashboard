<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white">
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            :color="selectedButton == 'dashboard' ? 'white' : 'blue'"
            :text-color="selectedButton == 'dashboard' ? 'black' : 'white'"
            label="Dashboard"
            class="q-mt-md"
            @click="selectButton('dashboard')"
          >
            <q-tooltip>Dashboard</q-tooltip>
          </q-btn>
          <q-btn
            :color="selectedButton == 'tarefas' ? 'white' : 'blue'"
            :text-color="selectedButton == 'tarefas' ? 'black' : 'white'"
            label="Tarefas"
            class="q-mt-md"
            @click="selectButton('tarefas')"
          >
            <q-tooltip>Tarefas</q-tooltip>
          </q-btn>
        </div>
        <q-space />
        <div class="search-container">
          <q-input
            dark
            dense
            standout
            v-model="searchQuery"
            input-class="text-left"
            class="search-bar"
            debounce="300"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon
                v-if="searchQuery !== ''"
                name="clear"
                class="cursor-pointer"
                @click="searchQuery = ''"
              />
            </template>
          </q-input>
        </div>
        <q-space />
        <q-btn round>
          <q-avatar size="40px">
            <img src="/img/Mateus_FundoAzul.png" />
            <q-menu>
              <div class="row no-wrap q-pa-md column items-center">
                <q-avatar size="72px">
                  <img src="/img/Mateus_FundoAzul.png" />
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs">Mateus</div>
                <q-btn
                  color="blue"
                  label="Encerrar sessão"
                  push
                  size="sm"
                  @click="logout"
                  v-close-popup
                />
              </div>
            </q-menu>
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const selectedButton = ref('');
const searchQuery = ref('');
const router = useRouter();

function selectButton(buttonName: string) {
  selectedButton.value = buttonName;
}

function logout() {
  router.push('/login');
}
</script>

<style scoped>
  @import 'src/css/style.css';
</style>