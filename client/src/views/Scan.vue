<script setup>
import { ref, reactive } from "vue";
import { useProductStore } from "@/stores/product";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { StreamBarcodeReader } from 'vue-barcode-reader';

const productStore = useProductStore();
const userStore = useUserStore();
const { fetchProductData, addToFavorites, addToHistory } = productStore;
const { currentUser } = storeToRefs(userStore);

const barcode = ref("");
const productFound = reactive([]);
const isScanning = ref(false);

const fetchProductDataHandler = async () => {
    productFound.push(await fetchProductData(barcode.value));
    addToHistory(barcode.value);
};

const clearProductFound = () => {
    productFound.pop();
    barcode.value = "";
};

const addProductToFavoritesHandler = async () => {
    await addToFavorites(barcode.value);
};

const toggleScanner = () => {
    isScanning.value = !isScanning.value;
};

const onDecode = async (result) => {
    barcode.value = result;
    await fetchProductDataHandler();
    toggleScanner();
};

const onError = (error) => {
    console.error(error);
};

const onLoaded = () => {
    console.log('Camera loaded');
};

</script>


<template>
    <div>
        <div v-if="productFound.length === 0" class="barcode-input">
        <form @submit.prevent="fetchProductDataHandler">
            <div class="label-input">
            <label for="barcode">Code-barres :</label>
            <input
                class="input-field"
                v-model="barcode"
                list="codebar-values"
                type="text"
                name="barcode"
                id="barcode"
                required
            />
            <datalist id="codebar-values">
                <option value="7622210449283"></option>
                <option value="3175680011480"></option>
                <option value="3274080005003"></option>
            </datalist>
            </div>
        <button>Valider</button>
        </form>
        <div class="button-container">
                <button class="centered-button" @click="toggleScanner">Scanner l'article</button>
            </div>    </div>
    <div v-if="isScanning" class="scanner">
        <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" @error="onError" />
        <button @click="toggleScanner">Fermer le scanner</button>
    </div>
        <div v-else class="product-display" v-for="p in productFound" :key="p.id">
        <p class="product-display__name">{{ p.name }}</p>
        <hr />
        <p class="product-display__marque">{{ p.marque }}</p>
        <div class="product-display__image">
            <img :src="p.img" alt="image" />
        </div>
        Ingrédients :
        <p>{{ p.ingredients }}</p>
        <p class="nutriscore">
        Nutriscore&nbsp;: <span>{{ p.nutriScore }}</span>
        </p>
        <button @click="clearProductFound">Fermer</button>
        <button v-if="currentUser" @click="addProductToFavoritesHandler">Ajouter aux favoris</button>
        </div>
    </div>
</template>

<style scoped>
.product-display__name {
    font-size: larger;
    font-weight: bold;
}
.product-display__marque {
    font-style: oblique;
}
.product-display__image {
    display: flex;
    align-items: center;
    justify-content: center;
}
.product-display__image img {
    width: 100px;
}

.product-display {
    color: var(--dark-green);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
}
.nutriscore {
    border: 1px solid var(--dark-green);
    border-radius: 2rem;
    padding: 0.25rem 0.5rem;
    align-self: flex-start;
}

.nutriscore span {
    text-transform: capitalize;
}
div.barcode-input {
    height: 100%;

    > form {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    }
}
div.barcode-input input {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
}

div.label-input {
    display: flex;
    flex-flow: column nowrap;

    > label {
    margin-bottom: 5px;
    color: #006633;
    font-weight: bold;
    }
}

.scanner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.centered-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    background-color: #006633;
    color: white;
    cursor: pointer;
}
</style>
