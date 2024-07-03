<template>
    <section class="row d-flex justify-content-center">
        <Loading v-if="producsStore.loading"/>
        <div v-else class="col-12 col-sm-9 col-md-7 col-lg-6 shadow p-3">
            <div class="col-12">
                <h4 class="text-center">Editar Producto</h4>
            </div>
            <DynamicForm :schema="formSchema" @valuesForm="valuesForm" titleBtn="Editar"/>
        </div>
    </section>
</template>

<script setup>
import * as Yup from 'yup';
import { computed, watch } from 'vue';
import { useProductStore } from "../store/products.store";
import Loading from '@/modules/shared/components/Loading.vue';
import DynamicForm from "@/modules/shared/components/DynamicForm.vue";
import { useSupplierStore } from '@/modules/suppliers/store/suppliers.store';
import { useCategoriesStore } from '@/modules/categories/store/categories.store';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const producsStore = useProductStore();
const suppliersStore = useSupplierStore();
const categoriesStore = useCategoriesStore();

const formSchema = computed(() => {
    return {
        fields: [
            {
                label: 'Nombre',
                name: 'name',
                as: 'input',
                value: producsStore.product.name,
                placeholder: 'Yogurt, Choclitos...',
                class: 'col-12',
                rules: Yup.string().required('Campo requerido.')
            },
            {
                label: 'Descripción',
                name: 'description',
                as: 'input',
                value: producsStore.product.description,
                type: 'text',
                class: 'col-12',
                placeholder: 'Escribe alguna nota',
                rules: Yup.string().required('Campo requerido.')
            },
            {
                label: 'Precio de Compra',
                name: 'purchasePrice',
                as: 'input',
                value: producsStore.product.purchasePrice,
                type: 'text',
                class: 'col-12 col-sm-6',
                placeholder: '100',
                rules: Yup.string().required('Campo requerido.').matches(/^\d+$/, 'Solo se permiten números.')
            },
            {
                label: 'Precio de Venta',
                name: 'salePrice',
                as: 'input',
                value: producsStore.product.salePrice,
                type: 'text',
                class: 'col-12 col-sm-6',
                placeholder: '100',
                rules: Yup.string().required('Campo requerido.').matches(/^\d+$/, 'Solo se permiten números.')
            },
            {
                label: 'Stock',
                name: 'stock',
                as: 'input',
                value: producsStore.product.stock,
                type: 'text',
                class: 'col-12 col-sm-6',
                placeholder: '100',
                rules: Yup.string().required('Campo requerido.').matches(/^\d+$/, 'Solo se permiten números.')
            },
            {
                label: 'Categoría',
                name: 'category',
                as: 'select',
                value: producsStore.product.category ? producsStore.product.category._id : '',
                class: 'col-12 col-sm-6',
                options: categoriesStore.inputValuesSelect,
                rules: Yup.string().required('Campo requerido.')
            },
            {
                label: 'Proveedor',
                name: 'supplier',
                as: 'select',
                value: producsStore.product.supplier ? producsStore.product.supplier._id : '',
                class: 'col-12',
                options: suppliersStore.inputValuesSelect,
                rules: Yup.string().required('Campo requerido.')
            },
        ]
    }
});

const valuesForm = (values) => {
    producsStore.createOrUpdateProduct(values);
}

watch(
    () => props.id,
    () => {
        categoriesStore.listCategory();
        suppliersStore.listSupplier();
        producsStore.getProduct(props.id);
    }, 
    {
        immediate: true
    }
);
</script>