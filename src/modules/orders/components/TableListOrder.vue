<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Proveedor</th>
                <th scope="col">Estado Pedido</th>
                <th scope="col">Total</th>
                <th scope="col">Creado</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody v-if="!ordersStore.hasOrders">
            <tr>
                <th colspan="6 text-center">No hay pedidos para mostrar</th>
            </tr>
        </tbody>
        <tbody v-else>
            <tr
                v-for="(order, index) in ordersStore.orders"
                :key="order._id"
                >
                <th scope="row">
                    <router-link
                        class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                        :to="{name: 'view-order', params: {id: order._id}}">
                        {{ index + 1 }}
                    </router-link>
                </th>
                <td>{{ order.supplier.name }}</td>
                <td>{{ order.statusOrder }}</td>
                <td>${{ order.totalPurchase }}</td>
                <td>{{ formatDate(order.createdAt) }}</td>
                <td>
                    <button class="btn btn-outline-info me-1 mt-1" @click="actionOrder(order._id, 'PUT')">
                        <img src="@/assets/svgs/edit.svg" alt="Icon Edit" class="height-icon">
                    </button>
                    <button class="btn btn-outline-info mt-1" @click="actionOrder(order._id, 'DELETE')">
                        <img src="@/assets/svgs/delete.svg" alt="Icon Delete" class="height-icon">
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useOrderStore } from '../store/orders.store';
import { showDeleteAlert } from '@/helpers/showDeleteAlert';

const router = useRouter();
const ordersStore = useOrderStore();

const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const actionOrder = (id, method) => {
    if (method === 'PUT') {
        router.push({name: 'edit-order', params: {id}});
        return;
    }

    // showDeleteAlert(ordersStore.deleteProduct, id);
};
</script>