<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Celular</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody v-if="!customersStore.hasCustomers">
            <tr>
                <th colspan="4 text-center">No hay clientes para mostrar</th>
            </tr>
        </tbody>
        <tbody v-else>
            <tr
                v-for="(customer, index) in customersStore.customers"
                :key="customer._id"
                >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ customer.name }}</td>
                <td>{{ customer.phoneNumber }}</td>
                <td>
                    <button class="btn btn-outline-info me-1 mt-1" @click="actionCustomer(customer._id, 'PUT')">
                        <img src="@/assets/svgs/edit.svg" alt="Icon Edit" class="height-icon">
                    </button>
                    <button class="btn btn-outline-info mt-1" @click="actionCustomer(customer._id, 'DELETE')">
                        <img src="@/assets/svgs/delete.svg" alt="Icon Delete" class="height-icon">
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { showDeleteAlert } from '@/helpers/showDeleteAlert';
import { useCustomerStore } from '../store/customers.store';

const router = useRouter();
const customersStore = useCustomerStore();

const actionCustomer = (id, method) => {
    if (method === 'PUT') {
        router.push({name: 'edit-customer', params: {id}});
        return;
    }

    showDeleteAlert(customersStore.deleteCustomer, id);
};
</script>