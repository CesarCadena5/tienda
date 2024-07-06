<template>
    <section class="row d-flex justify-content-center position-relative">
        <Loading v-if="suppliersStore.loading" class="h-100"/>
        <div v-else class="col-12 col-sm-9 col-md-7 col-lg-6 shadow p-3">
            <div class="col-12">
                <h4 class="text-center">Editar Proveedor</h4>
            </div>
            <DynamicForm :schema="formSchema" @valuesForm="valuesForm" titleBtn="Editar"/>
        </div>
    </section>
</template>

<script setup>
import * as Yup from 'yup';
import { computed, watch } from "vue";
import { useSupplierStore } from "../store/suppliers.store";
import Loading from '@/modules/shared/components/Loading.vue';
import DynamicForm from "@/modules/shared/components/DynamicForm.vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const suppliersStore = useSupplierStore();

const formSchema = computed(() => {
    return {
        fields: [
            {
                label: 'Nombre',
                name: 'name',
                as: 'input',
                placeholder: 'Carlos José Torres',
                class: 'col-12',
                value: suppliersStore.supplier.name,
                rules: Yup.string().required('Campo requerido.')
            },
            {
                label: 'Celular',
                name: 'phoneNumber',
                as: 'input',
                type: 'number',
                class: 'col-12',
                value: suppliersStore.supplier.phoneNumber,
                placeholder: '3154258524',
                rules: Yup.number('Digita el número').max(9999999999, 'Máximo 10 caracteres').positive('Debe ser un número positivo').integer('Debe ser un número entero').required('Campo requerido.')
            },
        ]
    }
});

const valuesForm = (values) => {
    suppliersStore.createOrUpdateSupplier(values);
}

watch(
    () => props.id,
    () => {
        suppliersStore.getSupplier(props.id);
    }, 
    {
        immediate: true
    }
);
</script>