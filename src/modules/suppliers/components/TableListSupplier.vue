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
        <tbody v-if="suppliersStore.suppliers.length === 0">
            <tr>
                <th colspan="4 text-center">No hay proveedores para mostrar</th>
            </tr>
        </tbody>
        <tbody v-else>
            <tr
                v-for="(supplier, index) in suppliersStore.suppliers"
                :key="supplier._id"
                >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ supplier.name }}</td>
                <td>{{ supplier.phoneNumber }}</td>
                <td>
                    <button class="btn btn-outline-info me-1 mt-1" @click="actionSupplier(supplier._id, 'PUT')">
                        <img src="@/assets/svgs/edit.svg" alt="Icon Edit" class="height-icon">
                    </button>
                    <button class="btn btn-outline-info mt-1" @click="actionSupplier(supplier._id, 'DELETE')">
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
import { useSupplierStore } from '../store/suppliers.store';

const router = useRouter();
const suppliersStore = useSupplierStore();

const actionSupplier = (id, method) => {
    if (method === 'PUT') {
        router.push({name: 'edit-supplier', params: {id}});
        return;
    }

    showDeleteAlert(suppliersStore.deleteSupplier, id);
};
</script>