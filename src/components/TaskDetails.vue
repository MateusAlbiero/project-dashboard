<template>
  <div>
    <div class="text-h5 mb-2 mt-4">{{ task.name }}</div>
    <div class="flex-jb">
      <div class="flex-js">
        <section class="details-task">
          <strong class="mb-05">
            <q-icon name="description" class="mr-05" />Protocolo
          </strong>
          <strong class="mb-05">
            <q-icon name="info" class="mr-05" />Status
          </strong>
          <strong class="mb-05">
            <q-icon name="label" class="mr-05" />Etiquetas
          </strong>
          <strong class="mb-05">
            <q-icon name="phone_in_talk" class="mr-05" />Contato parceiro
          </strong>
        </section>
        <section>
          <div>{{ task.custom_id ? task.custom_id : 'Sem protocolo' }}</div>
          <div>
            <q-chip
              size="12px"
              :class="{
                'bg-yellow-8 text-white': task.status?.id === 'sc901303007954_VhnEd1ez',
                'bg-blue-8 text-white': task.status?.id === 'sc901303007954_qiBEkmhZ',
                'bg-green-8 text-white': task.status?.id === 'sc901303007954_cq6ukTMC',
                'bg-gray text-black': task.status?.id === 'sc901303007954_tGoRmoEs',
                'bg-purple-8 text-white': task.status?.id === 'sc901303007954_GXKcfrH2',
                'bg-orange-8 text-white': task.status?.id === 'sc901303007954_qiBEkmhZ' || task.status?.id === 'sc901303007954_IFDVes5B'
              }"
            >
              {{ task.status?.id ? $t(`status.${task.status?.id}`) : 'Aberto' }}
            </q-chip>
          </div>
          <span v-if="task.tags && task.tags.length > 0">
            <span v-for="tag in task.tags" :key="tag.name">
              <q-chip size="12px" class="bg-blue-8 text-white mb-025">
                {{ tag.name }}
              </q-chip>
            </span>
          </span>
          <span v-else>
            <div class="mb-05 mt-025">Vazio</div>
          </span>
          <div>
            {{ task.custom_fields
              ? task.custom_fields.find(field => field.id === 'c019146b-e58d-4351-a0e2-23eb2bc94ffd')?.value || 'Não informado'
              : 'Não informado' }}
          </div>
        </section>
      </div>
      <div class="flex-js">
        <section class="details-task">
          <strong class="mb-05">
            <q-icon name="supervisor_account" class="mr-05" />Responsáveis
          </strong>
          <strong class="mb-05">
            <q-icon name="flag" class="mr-05" />Prioridade
          </strong>
          <strong class="mb-05">
            <q-icon name="build" class="mr-05" />Técnico responsável
          </strong>
          <strong class="mb-05">
            <q-icon name="headset" class="mr-05" />Equipe suporte
          </strong>
        </section>
        <section>
          <div>{{ task.assignees.map(a => a.username).join(', ') || 'Não informado' }}</div>
          <div class="mb-025">
            <q-chip
              size="12px"
              :class="{
                'bg-red-8 text-white': task.priority?.priority === 'urgent',
                'bg-yellow-8 text-white': task.priority?.priority === 'pending',
                'bg-green-9 text-white': task.priority?.priority === 'completed',
                'bg-orange-8 text-white': task.priority?.priority === 'high',
                'bg-gray text-black': task.priority?.priority === 'low',
                'bg-blue-8 text-white': task.priority?.priority === 'normal' || task.priority?.priority === undefined
              }"
            >
              {{ task.priority ? $t(`priority.${task.priority?.priority}`) : 'Normal' }}
            </q-chip>
          </div>
          <div class="mb-05">
            {{ task.custom_fields
              ? task.custom_fields.find(field => field.id === '74deb46b-1412-4c18-85b3-d029aa21c523')?.value || 'Não informado'
              : 'Não informado' }}
          </div>
          <div>
            {{ task.custom_fields
              ? task.custom_fields.find(field => field.id === '05fd1448-a109-48ad-8075-7e478f0c3712')?.type_config.options[task.custom_fields.find(field => field.id === '05fd1448-a109-48ad-8075-7e478f0c3712')?.value]?.name || 'Não informado'
              : 'Não informado' }}
          </div>
        </section>
      </div>
    </div>
    <section class="mt-3 text-grey-8">Descrição</section>
    <q-scroll-area class="description-div q-pa-md q-mt-md q-border-radius" style="height: 300px;">
      <div>
        <div v-for="(line, index) in task.description.split('\n')" :key="index">
          {{ line }}
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
  export default {
    props: {
      task: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  @import 'src/css/style.css';
</style>