<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user.js"
import router from '../router/router.ts';

const userStore = useUserStore();

const username = ref("");
const usernameTouched = ref(false);
const password = ref("");
const passwordTouched = ref(false);

const passwordInvalid = computed(() => {
    return password.value.trim() === "" && passwordTouched.value;
});

const usernameInvalid = computed(() => {
    return usernameTouched.value && username.value.trim() === "";
});

const submitDisabled = computed(
() =>
    password.value === "" ||
    !passwordTouched.value ||
    !usernameTouched.value ||
    username.value.trim() === ""
);

function submitForm(){
    if (!submitDisabled.value){
        const credentials = {
            username: username.value.trim(),
            password: password.value.trim(),
        };
        const success = userStore.loginUser(credentials);
    if (success) {
        router.push({ name: "Home" });
    } else {
        alert("Invalid username or password !");
    }    
    }
}

</script>

<template>
    <div class="container">
    <form @submit.prevent="submitForm">
    <h3 class="form-title">Sign In</h3>

    <hr>

    <div class="input-wrapper">
        <label for="username">Username: </label>
    <input
        v-model="username"
        id="username"
        @input="usernameTouched = true"
        @change="usernameTouched = true"
        type="text"
        required
        class="input-field"
    />
        <span v-if="usernameInvalid">Username is required!</span>
    </div>

    <div class="input-wrapper">
        <label for="password">Password: </label>
    <input
        v-model="password"
        @input="passwordTouched = true"
        @change="passwordTouched = true"
        id="password"
        type="password"
        required
        class="input-field"
    />
    <div class="error" v-if="passwordInvalid">Invalid password!</div>
    </div>

    <button :disabled="submitDisabled" class="submit-button">Submit</button>
    <router-link class="sign-up-button" to="/sign-up">Sign Up</router-link>

    </form>
</div>

</template>


<style scoped>

.container {
display: flex;
justify-content: center;
align-items: center;
height: 35vh;
color: #006633; 
font-family: 'Acumin Variable Concept', sans-serif;
padding: 1.5rem;
}
.container form {
    width: 100%;
}

.form-title {
    margin-top: 0; 
}

.submit-button, .sign-up-button {
    background-color: #E32B15; 
    color: beige; 
    float: right; 
    border-radius: 5px; 
    border: 1px solid transparent;
    padding: 5px; 
    transition: background-color 400ms ease-out;
    font-size: large;
    margin-top: 20px; 
    width: 100px; 
}

.submit-button, .sign-up-button :hover {
    background-color: #E32B15 ;
}

.sign-up-button {
    margin-right: 10px;
    text-decoration: none;
    text-align: center;
}


hr {
    color: #0B9D60; 
    border-color: #0B9D60; 
    margin-top: 0px; 
    margin-bottom: 20px; 
}

.input-field {
    background-color: #c4fbe4!important; 
    border: none; 
    padding: 5px; 
}
.error {
    color: red;
    margin-top: 10px;
    font-weight: bold;
    width: 100%;
}

.input-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
}

.input-wrapper label {
    width: 120px; 
    margin-right: 5px;
}

.input-wrapper input {
    flex: 1;
}
</style>