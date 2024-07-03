import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { getDataApi } from "@/helpers/getDataApi";
import { showErrorsAlert } from "@/helpers/showErrorsAlert";

export const useCategoriesStore = defineStore('categories', () => {
    const router = useRouter();
    const categories = ref([]);
    const category = ref({
        _id: null,
        name: ''
    });
    const loading = ref(false);
    const searchTerm = ref('');
    const pathUrlModule = 'category';

    // pagination
    const nextPage = ref(null);
    const prevPage = ref(null);
    const totalPages = ref(0);
    const totalDocs = ref(0);

    const setLoading = (value) => {
        loading.value = value;
    }

    const setCategories = (value) => {
        categories.value = value;
    }

    const setCategory = (value) => {
        category.value = value;
    }

    const setSearchTerm = (value) => {
        searchTerm.value = value;
    }

    // pagination
    const setTotalPages = (value) => {
        totalPages.value = value;
    }

    const setTotalDocs = (value) => {
        totalDocs.value = value;
    }

    const setNextPage = (value) => {
        nextPage.value = value;
    }

    const setPrevPage = (value) => {
        prevPage.value = value;
    }

    const hasCategories = computed(() => categories.value.length > 0);
    const inputValuesSelect = computed(() => {
        const options = categories.value.map(category => ({
            value: category._id,
            text: category.name
        }));

        options.unshift({ value: '', text: 'Selecciona' });
        return options;
    });

    const createOrUpdateCategory = async () => {
        setLoading(true);
        const data = { name: category.value.name };
        const finishPath = !category.value._id ? '/create' : `/${category.value._id}`;
        const method = !category.value._id ? 'POST' : 'PUT';

        const responseCreate = await getDataApi(`${pathUrlModule}${finishPath}`, data, method);
        const { icon: iconResponse, errors, msg, error } = await responseCreate.json();

        setLoading(false);
        if (errors && errors.length > 0) {
            showErrorsAlert(iconResponse, null, 'Errores de validación', errors);
            return;
        } else if (error) {
            showErrorsAlert(iconResponse, null, error, []);
            return;
        }

        showErrorsAlert(iconResponse, router, msg, [], 'list-category');
    };

    const listCategory = async (page = 1, limit = 5) => {
        setLoading(true);
        const urlPath = `${pathUrlModule}/list?page=${page}&limit=${limit}&search=${searchTerm.value}`;

        const responseList = await getDataApi(urlPath, {}, 'GET');
        const { icon: iconResponse, data, error } = await responseList.json();

        if (error) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, error);
            setCategories([]);
            return;
        }

        setCategory({ _id: null, name: '' });

        // showErrorsAlert(iconResponse, null, msg, [], '', true);
        setCategories(data.docs);
        setTotalPages(data.totalPages);
        setTotalDocs(data.totalDocs);
        setPrevPage(data.prevPage);
        setNextPage(data.nextPage);
        setLoading(false);
    };

    const getCategory = async (id) => {
        setLoading(true);
        const responseGetCategory = await getDataApi(`${pathUrlModule}/${id}`, {}, 'GET');
        const { icon: iconResponse, errors, msg, data } = await responseGetCategory.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, router, 'Error de Búsqueda', errors, 'list-category');
            return;
        }

        showErrorsAlert(iconResponse, null, msg, [], '', true);
        setCategory(data);
        setLoading(false);
    };

    const deleteCategory = async (id) => {
        setLoading(true);
        const responseDeleteCategory = await getDataApi(`${pathUrlModule}/${id}`, {}, 'DELETE');
        const { icon: iconResponse, errors, msg } = await responseDeleteCategory.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, 'Error de Eliminación', errors);
            return;
        }

        setLoading(false);
        listCategory();
    };

    return {
        categories,
        category,
        loading,
        hasCategories,
        totalDocs,
        setSearchTerm,
        inputValuesSelect,

        totalPages,
        prevPage,
        nextPage,

        createOrUpdateCategory,
        listCategory,
        getCategory,
        deleteCategory
    }
});