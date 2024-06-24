<template>
    <nav class="d-flex gap-4 py-1 ps-1">
        <button class="btn btn-outline-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <img src="@/assets/svgs/menu.svg" class="icon-height" alt="Icon Menu">
        </button>
        <section class="d-flex gap-2">
            <router-link
                v-for="(route, index) in routes"
                :key="index" 
                type="button" 
                class="btn btn-outline-primary"
                :to="{name: route.path}"
            >
                {{ route.name }}
            </router-link>
        </section>
    </nav>
</template>

<script setup>
const props = defineProps({
    routes: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>
.icon-height {
    height: 25px;
}
</style>