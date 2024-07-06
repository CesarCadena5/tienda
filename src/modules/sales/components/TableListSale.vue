<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Cliente</th>
                <th scope="col">Estado Venta</th>
                <th scope="col">Total</th>
                <th scope="col">Creado</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody v-if="!salesStore.hasSales">
            <tr>
                <th colspan="6 text-center">No hay ventas para mostrar</th>
            </tr>
        </tbody>
        <tbody v-else>
            <tr
                v-for="(sale, index) in salesStore.sales"
                :key="sale._id"
                >
                <th scope="row">
                    <router-link
                        class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                        :to="{name: 'view-sale', params: {id: sale._id}}">
                        {{ index + 1 }}
                    </router-link>
                </th>
                <td>{{ sale.customer.name }}</td>
                <td>{{ sale.statusSale }}</td>
                <td>${{ sale.totalSale }}</td>
                <td>{{ formatDate(sale.createdAt) }}</td>
                <td>
                    <button class="btn btn-outline-info me-1 mt-1" @click="actionSale(sale._id, 'PUT')">
                        <img src="@/assets/svgs/edit.svg" alt="Icon Edit" class="height-icon">
                    </button>
                    <button class="btn btn-outline-info mt-1" @click="actionSale(sale._id, 'DELETE')">
                        <img src="@/assets/svgs/delete.svg" alt="Icon Delete" class="height-icon">
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useSaleStore } from '../store/sales.store';
import { showDeleteAlert } from '@/helpers/showDeleteAlert';

const router = useRouter();
const salesStore = useSaleStore();

const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const actionSale = (id, method) => {
    if (method === 'PUT') {
        router.push({name: 'edit-sale', params: {id}});
        return;
    }

    showDeleteAlert(salesStore.deleteSale, id);
};
</script>