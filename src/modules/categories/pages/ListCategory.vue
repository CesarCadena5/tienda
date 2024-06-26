<template>
    <section class="row d-flex justify-content-center mt-2">
        <Loading v-if="categoriesStore.loading"/>
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 shadow rounded">
            <div class="col-12">
                <h4>Lista de Categorías</h4>
            </div>
            <TableListCategories :categories="categoriesStore.categories"/>
            <Pagination :store="categoriesStore" :methodListStore="categoriesStore.listCategory"/>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import Pagination from '../components/Pagination.vue';
import Loading from '@/modules/shared/components/Loading.vue';
import { useCategoriesStore } from '../store/categories.store';
import TableListCategories from '../components/TableListCategories.vue';

const categoriesStore = useCategoriesStore();
onMounted(() => {
    categoriesStore.listCategory();
});
</script>