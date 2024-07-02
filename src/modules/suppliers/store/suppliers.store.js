import { getDataApi } from "@/helpers/getDataApi";
import { showErrorsAlert } from "@/helpers/showErrorsAlert";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export const useSupplierStore = defineStore('supplier', () => {
    const router = useRouter();
    const suppliers = ref([]);
    const supplier = ref({
        _id: null,
        name: '',
        phoneNumber: ''
    });
    const loading = ref(false);
    const searchTerm = ref('');
    const pathUrlModule = 'supplier';

    // pagination
    const nextPage = ref(null);
    const prevPage = ref(null);
    const totalPages = ref(0);
    const totalDocs = ref(0);

    const setLoading = (value) => {
        loading.value = value;
    }

    const setSuppliers = (value) => {
        suppliers.value = value;
    }

    const setSupplier = (value) => {
        supplier.value = value;
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

    const hasSuppliers = computed(() => suppliers.value.length > 0);

    // methods
    const createOrUpdateSupplier = async (values) => {
        setLoading(true);

        const finishPath = !supplier.value._id ? '/create' : `/${supplier.value._id}`;
        const method = !supplier.value._id ? 'POST' : 'PUT';

        const responseCreate = await getDataApi(`${pathUrlModule}${finishPath}`, values, method);
        const { icon: iconResponse, errors, msg, error } = await responseCreate.json();

        setLoading(false);
        if (errors && errors.length > 0) {
            showErrorsAlert(iconResponse, null, 'Errores de validación', errors);
            return;
        } else if (error) {
            showErrorsAlert(iconResponse, null, error, []);
            return;
        }

        showErrorsAlert(iconResponse, router, msg, [], 'list-supplier');
    };

    const listSupplier = async (page = 1, limit = 5) => {
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

        setSupplier({ _id: null, name: '', phoneNumber: '' });

        setSuppliers(data.docs);
        setTotalPages(data.totalPages);
        setTotalDocs(data.totalDocs);
        setPrevPage(data.prevPage);
        setNextPage(data.nextPage);
        setLoading(false);
    };

    const getSupplier = async (id) => {
        setLoading(true);
        const responseGetSupplier = await getDataApi(`${pathUrlModule}/${id}`, {}, 'GET');
        const { icon: iconResponse, errors, msg, data } = await responseGetSupplier.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, router, 'Error de Búsqueda', errors, 'list-supplier');
            return;
        }

        setSupplier(data);
        showErrorsAlert(iconResponse, null, msg, [], '', true);
        setLoading(false);
    };

    const deleteSupplier = async (id) => {
        setLoading(true);
        const responseDeleteSupplier = await getDataApi(`${pathUrlModule}/${id}`, {}, 'DELETE');
        const { icon: iconResponse, errors } = await responseDeleteSupplier.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, 'Error de Eliminación', errors);
            return;
        }

        setLoading(false);
        listSupplier();
    };

    return {
        suppliers,
        supplier,
        loading,
        hasSuppliers,
        totalDocs,
        setSearchTerm,

        totalPages,
        prevPage,
        nextPage,

        createOrUpdateSupplier,
        listSupplier,
        deleteSupplier,
        getSupplier
    }
});