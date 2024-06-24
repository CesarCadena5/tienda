import { ref } from "vue";
import { defineStore } from "pinia";
import { getDataApi } from "@/helpers/getDataApi";
import { showErrorsAlert } from "@/helpers/showErrorsAlert";
import { useRouter } from "vue-router";

export const useCategoriesStore = defineStore('categories', () => {
    const router = useRouter();
    const categories = ref([]);
    const loading = ref(false);
    const icon = ref('');
    const msgResponse = ref('');
    const errors = ref([]);
    const pathUrlModule = 'category';

    const setLoading = (value) => {
        loading.value = value;
    }

    const setIcon = (value) => {
        icon.value = value;
    }

    const setMsgResponse = (value) => {
        msgResponse.value = value;
    }

    const createOrUpdateCategory = async (name, id = '') => {
        setLoading(true);
        const data = { name };
        const finishPath = name !== '' ? '/create' : `/${id}`;

        const responseCreate = await getDataApi(`${pathUrlModule}${finishPath}`, data);
        const { icon: iconResponse, errors, msg } = await responseCreate.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, 'Errores de validación', errors);
            return;
        }

        showErrorsAlert(iconResponse, router, msg, [], 'list-category');
        setIcon(icon);
        setMsgResponse(msg);
        setLoading(false);
    };

    const listCategory = async () => {

    };

    return {
        categories,
        loading,
        errors,

        createOrUpdateCategory
    }
});