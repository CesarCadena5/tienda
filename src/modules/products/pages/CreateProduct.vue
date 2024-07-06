<template>
    <section class="row d-flex justify-content-center position-relative">
        <Loading v-if="producsStore.loading" class="h-100"/>
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 shadow p-3">
            <div class="col-12">
                <h4 class="text-center">Nuevo Producto</h4>
            </div>
            <DynamicForm :schema="formSchema" @valuesForm="valuesForm"/>
        </div>
    </section>
</template>

<script setup>
import * as Yup from 'yup';
import { computed, onMounted } from 'vue';
import { useProductStore } from "../store/products.store";
import Loading from '@/modules/shared/components/Loading.vue';
import DynamicForm from "@/modules/shared/components/DynamicForm.vue";
import { useSupplierStore } from '@/modules/suppliers/store/suppliers.store';
import { useCategoriesStore } from '@/modules/categories/store/categories.store';

const suppliersStore = useSupplierStore();
const categoriesStore = useCategoriesStore();
const producsStore = useProductStore();

const formSchema = computed(() => {
    return {
        fields: [
            {
                label: 'Nombre',
                name: 'name',
                as: 'input',
                placeholder: 'Yogurt, Choclitos...',
                class: 'col-12',
                rules: Yup.string().required('Campo requerido.')
            },
            {
                label: 'Descripción',
                name: 'description',
                as: 'input',
                type: 'text',
                class: 'col-12',
                placeholder: 'Escribe alguna nota',
                rules: Yup.string().required('Campo requerido.')
            },
            {
                label: 'Precio de Compra',
                name: 'purchasePrice',
                as: 'input',
                type: 'text',
                class: 'col-12 col-sm-6',
                placeholder: '100',
                rules: Yup.string().required('Campo requerido.').matches(/^\d+$/, 'Solo se permiten números.')
            },
            {
                label: 'Precio de Venta',
                name: 'salePrice',
                as: 'input',
                type: 'text',
                class: 'col-12 col-sm-6',
                placeholder: '100',
                rules: Yup.string().required('Campo requerido.').matches(/^\d+$/, 'Solo se permiten números.')
            },
            {
                label: 'Stock',
                name: 'stock',
                as: 'input',
                type: 'text',
                class: 'col-12 col-sm-6',
                placeholder: '100',
                rules: Yup.string().required('Campo requerido.').matches(/^\d+$/, 'Solo se permiten números.')
            },
            {
                label: 'Categoría',
                name: 'category',
                as: 'select',
                class: 'col-12 col-sm-6',
                classInput: 'form-select',
                options: categoriesStore.inputValuesSelect,
                rules: Yup.string().required('Campo requerido.')
            },
            {
                label: 'Proveedor',
                name: 'supplier',
                as: 'select',
                class: 'col-12',
                classInput: 'form-select',
                options: suppliersStore.inputValuesSelect,
                rules: Yup.string().required('Campo requerido.')
            },
        ]
    }
});

onMounted(() => {
    categoriesStore.listCategory();
    suppliersStore.listSupplier();
});

const valuesForm = (values) => {
    producsStore.createOrUpdateProduct(values);
}
</script>