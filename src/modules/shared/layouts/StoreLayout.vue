<template>
    <main>
        <Sidebar/>
        <router-view></router-view>
    </main>
</template>

<script setup>
import Sidebar from "@/modules/shared/components/Sidebar.vue";
</script>