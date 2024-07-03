<template>
    <div class="input-group mb-3">
        <input type="text" v-model="searchTerm" class="form-control" placeholder="Buscar" aria-label="Lácteos, Bebidas..." aria-describedby="button-addon2">
        <button class="btn btn-outline-info" disabled type="button" id="button-addon2">
            <img src="@/assets/svgs/search-icon.svg" alt="Icon Search" class="height-icon">
        </button>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    store: {
        type: Object,
        required: true
    },
    methodListStore: {
        type: Function,
        required: true
    }
});

const debounceTimeout = ref();

const searchTerm = computed({
    get() {},
    set(value) {
        if (debounceTimeout.value) clearTimeout(debounceTimeout.value);

        debounceTimeout.value = setTimeout(() => {
            props.store.setSearchTerm(value);
            props.methodListStore();
        }, 500);
    }
});
</script>