<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-card-section class="bg-blue text-white">
        <div class="text-h6">Sincronização</div>
        <div class="text-subtitle2">Marcos de Oliveira</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat>Detalhes</q-btn>
      </q-card-actions>
    </q-card>
    <q-card class="my-card">
      <q-card-section class="bg-blue text-white">
        <div class="text-h6">Erro de ortografia</div>
        <div class="text-subtitle2">Wesley Schons</div>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat>Detalhes</q-btn>
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-card-section class="bg-blue text-white">
        <div class="text-h6">Atualização alter</div>
        <div class="text-subtitle2">Tiagão</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn flat>Detalhes</q-btn>
      </q-card-actions>
    </q-card>
    <q-card class="my-card">
      <q-card-section class="bg-blue text-white">
        <div class="text-h6">Erro ao gravar cadastro</div>
        <div class="text-subtitle2">Victor Rigon</div>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat>Detalhes</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  setup () {
    return {
      lorem: 'Ajustes na sincronização do comandas do SG Master com o MeuSG.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>