<template>
    <section class="row d-flex justify-content-center mt-2">
        <Loading v-if="productsStore.loading"/>
        <div class="col-12 col-sm-12 col-lg-10 shadow-lg py-2 rounded">
            <div class="col-12 mb-3">
                <h4 class="text-center">Lista de Productos</h4>
            </div>
            <div class="col-12 col-md-10 col-lg-6 mx-auto">
                <SearchItem :store="productsStore" :methodListStore="productsStore.listProduct"/>
            </div>
            <TableListProducts/>
            <Pagination :store="productsStore" :methodListStore="productsStore.listProduct"/>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../store/products.store';
import Loading from '@/modules/shared/components/Loading.vue';
import SearchItem from "@/modules/shared/components/SearchItem.vue";
import Pagination from '@/modules/shared/components/Pagination.vue';
import TableListProducts from '../components/TableListProducts.vue';

const productsStore = useProductStore();

onMounted(() => {
    productsStore.listProduct();
});
</script>