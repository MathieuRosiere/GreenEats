<script setup>
import Button from '../components/Button.vue'
</script>

<template>

    <div class="texte"><h1>Cette page n'existe pas</h1></div>

    <div class="tomate-erreur">
        <img class="tomato" src="../img/Errorpage.jpg" alt="Page erreur">
    </div>

<Button @click="$emit('someEvent')">Nouvelle saisie</Button>
<MyComponent @some-event="callback" />


</template>

<style scoped>



.texte {
        display: flex;
        flex-wrap: column nowrap;
        justify-content: center;
        align-content: center;
        color: var(--green);
}

.tomate-erreur {
        display: flex;
        flex-wrap: row nowrap;
        justify-content: center;
        align-content: center;
    }

    .tomato {
        width: 75%;
    }

    .btn {
        width: 100px;
        height: 30px;
        border-radius: 10px;
        background-color: var(--button-active);
        color: beige;
    }
</style>../components/Button.vue