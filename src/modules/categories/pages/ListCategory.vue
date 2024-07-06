<template>
    <section class="row d-flex justify-content-center mt-2 position-relative">
        <Loading v-if="categoriesStore.loading" class="h-100"/>
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 shadow-lg py-2 rounded">
            <div class="col-12 mb-3">
                <h4 class="text-center">Lista de Categorías</h4>
            </div>
            <div class="col-12 col-md-8 col-lg-6 mx-auto">
                <SearchItem :store="categoriesStore" :methodListStore="categoriesStore.listCategory"/>
            </div>
            <TableListCategories/>
            <Pagination :store="categoriesStore" :methodListStore="categoriesStore.listCategory"/>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import Loading from '@/modules/shared/components/Loading.vue';
import { useCategoriesStore } from '../store/categories.store';
import SearchItem from "@/modules/shared/components/SearchItem.vue";
import Pagination from '@/modules/shared/components/Pagination.vue';
import TableListCategories from '../components/TableListCategories.vue';

const categoriesStore = useCategoriesStore();
onMounted(() => {
    categoriesStore.listCategory();
});
</script>