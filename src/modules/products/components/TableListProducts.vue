<template>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoría</th>
                <th scope="col">P. Compra</th>
                <th scope="col">P. Venta</th>
                <th scope="col">Stock</th>
                <th scope="col">Proveedor</th>
                <th scope="col">Creado</th>
                <!-- <th scope="col">Actualizado</th> -->
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody v-if="!productsStore.hasProducts">
            <tr>
                <th colspan="10 text-center">No hay productos para mostrar</th>
            </tr>
        </tbody>
        <tbody v-else>
            <tr
                v-for="(products, index) in productsStore.products"
                :key="products._id"
                >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ products.name }}</td>
                <td>{{ products.category.name }}</td>
                <td>${{ products.purchasePrice }}</td>
                <td>${{ products.salePrice }}</td>
                <td>{{ products.stock }}</td>
                <td>{{ products.supplier.name }}</td>
                <!-- <td>{{ formatDate(products.createdAt) }}</td> -->
                <td>{{ formatDate(products.updatedAt) }}</td>
                <td>
                    <button class="btn btn-outline-info me-1 mt-1" @click="actionProduct(products._id, 'PUT')">
                        <img src="@/assets/svgs/edit.svg" alt="Icon Edit" class="height-icon">
                    </button>
                    <button class="btn btn-outline-info mt-1" @click="actionProduct(products._id, 'DELETE')">
                        <img src="@/assets/svgs/delete.svg" alt="Icon Delete" class="height-icon">
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useProductStore } from '../store/products.store';
import { showDeleteAlert } from '@/helpers/showDeleteAlert';

const router = useRouter();
const productsStore = useProductStore();

const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const actionProduct = (id, method) => {
    if (method === 'PUT') {
        router.push({name: 'edit-product', params: {id}});
        return;
    }

    showDeleteAlert(productsStore.deleteProduct, id);
};
</script>