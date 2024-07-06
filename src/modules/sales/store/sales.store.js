import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { getDataApi } from "@/helpers/getDataApi";
import { showErrorsAlert } from "@/helpers/showErrorsAlert";

export const useSaleStore = defineStore('sale', () => {
    const router = useRouter();
    const sales = ref([]);
    const sale = ref({
        _id: null,
        customer: {},
        totalSale: '',
        additionalNote: '',
        statusSale: '',
        products: [],
    });
    const loading = ref(false);
    const searchTerm = ref('');
    const pathUrlModule = 'sale';

    // pagination
    const nextPage = ref(null);
    const prevPage = ref(null);
    const totalPages = ref(0);
    const totalDocs = ref(0);

    const setLoading = (value) => {
        loading.value = value;
    }

    const setSales = (value) => {
        sales.value = value;
    }

    const setSale = (value) => {
        sale.value = value;
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

    const hasSales = computed(() => sales.value.length > 0);

    // methods
    const createOrUpdate = async (values) => {
        setLoading(true);

        const finishPath = !sale.value._id ? '/create' : `/${sale.value._id}`;
        const method = !sale.value._id ? 'POST' : 'PUT';

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

        showErrorsAlert(iconResponse, router, msg, [], 'list-sale');
    };

    const listSale = async (page = 1, limit = 5) => {
        setLoading(true);
        const urlPath = `${pathUrlModule}/list?page=${page}&limit=${limit}&search=${searchTerm.value}`;

        const responseList = await getDataApi(urlPath, {}, 'GET');
        const { icon: iconResponse, data, error } = await responseList.json();

        if (error) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, error);
            setSales([]);
            return;
        }

        setSale({
            _id: null,
            customer: {},
            totalSale: '',
            statusSale: '',
            products: []
        });

        setSales(data.docs);
        setTotalPages(data.totalPages);
        setTotalDocs(data.totalDocs);
        setPrevPage(data.prevPage);
        setNextPage(data.nextPage);
        setLoading(false);
    };

    const getItem = async (id) => {
        setLoading(true);
        const responseGetSale = await getDataApi(`${pathUrlModule}/${id}`, {}, 'GET');
        const { icon: iconResponse, errors, msg, data } = await responseGetSale.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, router, 'Error de Búsqueda', errors, 'list-sale');
            return;
        }

        setSale(data);
        showErrorsAlert(iconResponse, null, msg, [], '', true);
        setLoading(false);
    };

    const deleteSale = async (id) => {
        setLoading(true);
        const responseDeleteSale = await getDataApi(`${pathUrlModule}/${id}`, {}, 'DELETE');
        const { icon: iconResponse, errors } = await responseDeleteSale.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, 'Error de Eliminación', errors);
            return;
        }

        setLoading(false);
        listSale();
    };

    return {
        sales,
        sale,
        loading,
        setSearchTerm,
        hasSales,

        totalPages,
        prevPage,
        nextPage,
        totalDocs,

        createOrUpdate,
        listSale,
        getItem,
        deleteSale
    }
});