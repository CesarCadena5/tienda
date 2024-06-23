<template>
    <AuthSlot title="Login">
        <template v-slot:route-auth>
            <router-link :to="{name: 'register'}" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">¿No tienes cuenta?</router-link>
        </template>
    </AuthSlot>
</template>

<script setup>
import AuthSlot from "../slots/AuthSlot.vue";
</script>