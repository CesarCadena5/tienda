<template>
    <section class="row d-flex justify-content-center">
        <Loading v-if="customersStore.loading"/>
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 shadow p-3 mt-3">
            <div class="col-12">
                <h4 class="text-center">Nuevo Cliente</h4>
            </div>
            <DynamicForm :schema="formSchema" @valuesForm="valuesForm"/>
        </div>
    </section>
</template>

<script setup>
import * as Yup from 'yup';
import { useCustomerStore } from '../store/customers.store';
import Loading from '@/modules/shared/components/Loading.vue';
import DynamicForm from "@/modules/shared/components/DynamicForm.vue";

const customersStore = useCustomerStore();

const formSchema = {
    fields: [
        {
            label: 'Nombre',
            name: 'name',
            as: 'input',
            placeholder: 'Carlos José Torres',
            class: 'col-12',
            rules: Yup.string().required('Campo requerido.')
        },
        {
            label: 'Celular',
            name: 'phoneNumber',
            as: 'input',
            type: 'number',
            class: 'col-12',
            placeholder: '3154258524',
            rules: Yup.number().max(9999999999, 'Máximo 10 caracteres').positive('Debe ser un número positivo').integer('Debe ser un número entero').required('Campo requerido.')
        },
    ]
};

const valuesForm = (values) => {
    customersStore.createOrUpdateCustomer(values);
}
</script>