<template>
    <section class="row d-flex justify-content-center position-relative">
        <Loading v-if="categoriesStore.loading" class="h-100"/>
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 shadow p-3">
            <div class="col-12">
                <h4 class="text-center">Nueva Categoría</h4>
            </div>
            <DynamicForm :schema="formSchema" @valuesForm="valuesForm"/>
        </div>
    </section>
</template>

<script setup>
import * as Yup from 'yup';
import Loading from '@/modules/shared/components/Loading.vue';
import DynamicForm from "@/modules/shared/components/DynamicForm.vue";
import { useCategoriesStore } from '../store/categories.store';

const categoriesStore = useCategoriesStore();

const formSchema = {
    fields: [
        {
            label: 'Nombre Categoría',
            name: 'name',
            as: 'input',
            placeholder: 'Galletas, Bebidas...',
            class: 'col-12',
            rules: Yup.string().required('Campo requerido.')
        }
    ]
};

const valuesForm = (values) => {
    categoriesStore.createOrUpdateCategory(values);
}
</script>