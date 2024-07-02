<template>
    <section class="row d-flex justify-content-center mt-2">
        <Loading v-if="customersStore.loading"/>
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 shadow-lg py-2 rounded">
            <div class="col-12 mb-3">
                <h4 class="text-center">Lista de Clientes</h4>
            </div>
            <div class="col-12 col-md-8 col-lg-6 mx-auto">
                <SearchItem :store="customersStore" :methodListStore="customersStore.listCustomer"/>
            </div>
            <TableListSupplier/>
            <Pagination :store="customersStore" :methodListStore="customersStore.listCustomer"/>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCustomerStore } from '../store/customers.store';
import Loading from '@/modules/shared/components/Loading.vue';
import SearchItem from "@/modules/shared/components/SearchItem.vue";
import Pagination from '@/modules/shared/components/Pagination.vue';
import TableListSupplier from '../components/TableListCustomer.vue';

const customersStore = useCustomerStore();
onMounted(() => {
    customersStore.listCustomer();
});
</script>