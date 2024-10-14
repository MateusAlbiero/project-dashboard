<template>
  <main class="tela-erro">
    <section>
      <h1>Ops...</h1>
      <h3>Página não encontrada</h3>
      <p>
        A página que você está tentando acessar pode ter sido removida, estar temporariamente indisponível ou o link foi informado incorretamente.
      </p>
    </section>
    <aside>
      <section>
        <span>404</span>
      </section>
    </aside>
  </main>
</template>
<script>
export default {
  name: 'ErrorPage',
}
</script>
<style scoped>
@import 'src/css/erro.css';
</style>