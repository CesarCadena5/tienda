<template>
    <section class="row d-flex justify-content-center mt-2 position-relative">
        <Loading v-if="salesStore.loading" class="h-100"/>
        <div class="col-12 col-sm-12 col-lg-10 shadow-lg py-2 rounded">
            <div class="col-12 mb-3">
                <h4 class="text-center">Lista de Ventas</h4>
            </div>
            <div class="col-12 col-md-10 col-lg-6 mx-auto">
                <SearchItem :store="salesStore" :methodListStore="salesStore.listSale"/>
            </div>
            <TableListSale/>
            <Pagination :store="salesStore" :methodListStore="salesStore.listSale"/>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSaleStore } from '../store/sales.store';
import TableListSale from '../components/TableListSale.vue';
import Loading from '@/modules/shared/components/Loading.vue';
import SearchItem from "@/modules/shared/components/SearchItem.vue";
import Pagination from '@/modules/shared/components/Pagination.vue';

const salesStore = useSaleStore();

onMounted(() => {
    salesStore.listSale();
});
</script>