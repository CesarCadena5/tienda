<template>
    <section>
        <Navbar :routes="routes"/>
        <router-view></router-view>
    </section>
</template>

<script setup>
import Navbar from '@/modules/shared/components/Navbar.vue';
const routes = [
    {
        path: 'create-customer',
        name: 'Crear'
    }, 
    {
        path: 'list-customer',
        name: 'Listar'
    }
];
</script>