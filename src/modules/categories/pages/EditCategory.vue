<template>
    <section class="row d-flex justify-content-center position-relative">
        <Loading v-if="categoriesStore.loading" class="h-100"/>
        <div v-else class="col-12 col-sm-9 col-md-7 col-lg-6 shadow p-3">
            <div class="col-12">
                <h4 class="text-center">Editar Categoría</h4>
            </div>
            <DynamicForm :schema="formSchema" @valuesForm="valuesForm" titleBtn="Editar"/>
        </div>
    </section>
</template>

<script setup>
import * as Yup from 'yup';
import { computed, watch } from "vue";
import Loading from '@/modules/shared/components/Loading.vue';
import { useCategoriesStore } from "../store/categories.store";
import DynamicForm from "@/modules/shared/components/DynamicForm.vue";
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const categoriesStore = useCategoriesStore();

const formSchema = computed(() => {
    return {
        fields: [
            {
                label: 'Nombre Categoría',
                name: 'name',
                as: 'input',
                placeholder: 'Galletas, Bebidas...',
                class: 'col-12',
                value: categoriesStore.category.name,
                rules: Yup.string().required('Campo requerido.')
            }
        ]
    }
});

const valuesForm = (values) => {
    categoriesStore.createOrUpdateCategory(values);
}

watch(
    () => props.id,
    () => {
        categoriesStore.getCategory(props.id);
    },
    {
        immediate: true
    }  
);
</script>