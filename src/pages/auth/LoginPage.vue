<template>
  <div class="login-page" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
    <div class="login-container">
      <img src="img/logo-sgbr.png" alt="Logo" class="logo" />
      <h1 class="login-title">Painel de tarefas</h1>
      <q-form @submit.prevent="handleLogin">
        <div class="input-container">
          <q-input
            v-model="cpf"
            label="Login"
            mask="###.###.###-##"
            unmasked-value
            outlined
            lazy-rules
            :rules="[ 
              val => (val && val.length > 0) || 'Informe o login',
              val => (val && val.replace(/\D/g, '').length === 11) || 'O CPF deve conter 11 dígitos'
            ]"
          />
        </div>
        <div class="input-container">
          <q-input 
            v-model="password"
            label="Senha"
            :type="isPwd ? 'password' : 'text'"
            maxlength="20"
            outlined
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Informe a senha']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="error-message" v-if="errorMessage">
            {{ errorMessage.replace('Acesso negado.', '') }}
          </div>
        </div>
        <div class="button-container">
          <q-btn class="w-75" type="submit" label="Entrar" color="blue" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiAcessoRestrito } from 'src/services/loginService';

interface AxiosError {
  response?: {
    data: {
      message: string;
    };
  };
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const cpf = ref('');
    const password = ref('');
    const isPwd = ref(true);
    const backgroundImage = ref('img/fundologin.png');
    const errorMessage = ref('');

    const handleLogin = async () => {
      errorMessage.value = '';
      try {
        const response = await apiAcessoRestrito.post('', {
          cpf: cpf.value,
          password: password.value,
        });

        console.log(response.data);
        router.push('/home');
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data.message) {
          errorMessage.value = axiosError.response.data.message;
        } else {
          errorMessage.value = 'Ocorreu um erro ao fazer login.';
        }
      }
    };

    return {
      cpf,
      password,
      isPwd,
      handleLogin,
      backgroundImage,
      errorMessage
    };
  },
});
</script>

<style scoped>
@import 'src/css/style.css';
</style>