<template>
    <AuthSlot title="Registrarse">
        <template v-slot:input-register>
            <div class="mb-3">
                <label for="exampleInputName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="exampleInputName" aria-describedby="nameHelp">
                <div id="nameHelp" class="form-text">El nombre es requerido</div>
            </div>
        </template>
        <template v-slot:route-auth>
            <router-link :to="{name: 'login'}" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">¿Ya tienes cuenta?</router-link>
        </template>
    </AuthSlot>
</template>

<script setup>
import AuthSlot from "../slots/AuthSlot.vue";
</script>