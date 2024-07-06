<template>
    <section class="row d-flex justify-content-center mt-2 position-relative">
        <Loading v-if="ordersStore.loading" class="h-100"/>
        <div class="col-12 col-sm-12 col-lg-10 shadow-lg py-2 rounded">
            <div class="col-12 mb-3">
                <h4 class="text-center">Lista de Pedidos</h4>
            </div>
            <div class="col-12 col-md-10 col-lg-6 mx-auto">
                <SearchItem :store="ordersStore" :methodListStore="ordersStore.listOrder"/>
            </div>
            <TableListOrder/>
            <Pagination :store="ordersStore" :methodListStore="ordersStore.listOrder"/>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useOrderStore } from '../store/orders.store';
import Loading from '@/modules/shared/components/Loading.vue';
import TableListOrder from '../components/TableListOrder.vue';
import SearchItem from "@/modules/shared/components/SearchItem.vue";
import Pagination from '@/modules/shared/components/Pagination.vue';

const ordersStore = useOrderStore();

onMounted(() => {
    ordersStore.listOrder();
});
</script>