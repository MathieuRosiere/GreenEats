<script setup>
    import Button from '../components/Button.vue'

    import { ref } from "vue";
let input = ref("");
const aliments = ["biscuits", "banane", "chocolat"];
function filteredList() {
  return aliments.filter((aliment) =>
    aliment.toLowerCase().includes(input.value.toLowerCase())
  );
}
</script>

<template>
  <div class="container">
    
    <h2>Rechercher un aliment</h2>
    <hr/>
    
    
    <input type="text" v-model="input" placeholder="Rechercher un aliment..." />
    <div class="item aliment" v-for="aliment in filteredList()" :key="fruit">
      <p>{{ aliment }}</p>
    </div>
    <div class="item error" v-if="input&&!filteredList().length">
      <p>No results found!</p>
    </div>
    
    <div class="button-container">
      <Button @click="$emit('someEvent')">Rechercher</Button>
    </div>
    <!-- <MyComponent @some-event="callback" /> -->
  </div>

</template>

<style scoped>
.container {
  padding: 1.5rem;
}
.container .button-container {
  max-width: 350px;
  margin: 20px auto;
}
body {
  padding: 20px;
  min-height: 100vh;
  background-color: rgb(234, 242, 255);
}

input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: rgba(15, 236, 144, 0.312) url("../img/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: beige;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.aliment {
  background-color: var(--green);
  cursor: pointer;
}

.aliment:hover {
  background-color: var(--dark-green);
  cursor: pointer;
}

.error {
  background-color: var(--button-active);
}

.button {
  display: flex;
  flex-direction: row;
  align-content: end;

}

</style>