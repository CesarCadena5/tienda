<template>
    <form
        @submit.prevent="handleSubmit" 
        class="row d-flex gy-2">
        <div class="col-12">
            <label for="nameCategory" class="form-label">Nombre</label>
            <input type="text" v-model="categoriesStore.category.name" class="form-control" id="nameCategory" placeholder="Bebidas, Dulces...">
        </div>
        <div class="col-12">
            <button type="submit" :disabled="btnDisabled" class="btn btn-outline-success">{{ titleBtn }}</button>
        </div>
    </form>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCategoriesStore } from '../store/categories.store';

const props = defineProps({
    titleBtn: {
        type: String,
        default: 'Crear'
    }
});

const categoriesStore = useCategoriesStore();

const btnDisabled = computed(() => categoriesStore.category.name.length < 4);

const handleSubmit = () => {
    categoriesStore.createOrUpdateCategory();
}
</script>