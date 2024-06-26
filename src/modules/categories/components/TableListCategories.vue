<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody v-if="categories.length === 0">
            <tr>
                <th colspan="3 text-center">No hay categorías para mostrar</th>
            </tr>
        </tbody>
        <tbody v-else>
            <tr
                v-for="(categorie, index) in categories"
                :key="categorie._id"
                >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ categorie.name }}</td>
                <td>
                    <button class="btn btn-outline-info me-1 mt-1" @click="actionCategory(categorie._id, 'PUT')">
                        <img src="@/assets/svgs/edit.svg" alt="Icon Edit" class="height-icon">
                    </button>
                    <button class="btn btn-outline-info mt-1" @click="actionCategory(categorie._id, 'DELETE')">
                        <img src="@/assets/svgs/delete.svg" alt="Icon Delete" class="height-icon">
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { useCategoriesStore } from '../store/categories.store';
import { showDeleteAlert } from '@/helpers/showDeleteAlert';

const props = defineProps({
    categories: {
        type: Array,
        default: []
    }
});

const router = useRouter();
const categoriesStore = useCategoriesStore();

const actionCategory = (id, method) => {
    if (method === 'PUT') {
        router.push({name: 'edit-category', params: {id}});
        return;
    }

    showDeleteAlert(categoriesStore.deleteCategory, id);
};
</script>

<style scoped>
.height-icon {
    height: 25px;
}
</style>