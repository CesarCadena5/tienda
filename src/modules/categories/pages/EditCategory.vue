<template>
    <section class="row d-flex justify-content-center">
        <Loading v-if="categoriesStore.loading"/>
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 shadow p-3">
            <div class="col-12">
                <h4 class="text-center">Editar Categoría</h4>
            </div>
            <FormCategory titleBtn="Editar"/>
        </div>
    </section>
</template>

<script setup>
import { watch } from "vue";
import FormCategory from "../components/FormCategory.vue";
import Loading from '@/modules/shared/components/Loading.vue';
import { useCategoriesStore } from "../store/categories.store";
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const categoriesStore = useCategoriesStore();

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