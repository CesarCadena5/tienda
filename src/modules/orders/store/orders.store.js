import { getDataApi } from "@/helpers/getDataApi";
import { showErrorsAlert } from "@/helpers/showErrorsAlert";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export const useOrderStore = defineStore('order', () => {
    const router = useRouter();
    const orders = ref([]);
    const order = ref({
        _id: null,
        supplier: {},
        totalPurchase: '',
        statusOrder: '',
        products: [],
    });
    const loading = ref(false);
    const searchTerm = ref('');
    const pathUrlModule = 'order';

    // pagination
    const nextPage = ref(null);
    const prevPage = ref(null);
    const totalPages = ref(0);
    const totalDocs = ref(0);

    const setLoading = (value) => {
        loading.value = value;
    }

    const setOrders = (value) => {
        orders.value = value;
    }

    const setOrder = (value) => {
        order.value = value;
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

    const hasOrders = computed(() => orders.value.length > 0);

    // methods
    const createOrUpdate = async (values) => {
        setLoading(true);

        const finishPath = !order.value._id ? '/create' : `/${order.value._id}`;
        const method = !order.value._id ? 'POST' : 'PUT';

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

        showErrorsAlert(iconResponse, router, msg, [], 'list-order');
    };

    const listOrder = async (page = 1, limit = 5) => {
        setLoading(true);
        const urlPath = `${pathUrlModule}/list?page=${page}&limit=${limit}&search=${searchTerm.value}`;

        const responseList = await getDataApi(urlPath, {}, 'GET');
        const { icon: iconResponse, data, error } = await responseList.json();
        console.log(data)
        if (error) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, error);
            setOrders([]);
            return;
        }

        setOrder({
            _id: null,
            supplier: {},
            totalPurchase: '',
            statusOrder: '',
            products: []
        });

        setOrders(data.docs);
        setTotalPages(data.totalPages);
        setTotalDocs(data.totalDocs);
        setPrevPage(data.prevPage);
        setNextPage(data.nextPage);
        setLoading(false);
    };

    const getItem = async (id) => {
        setLoading(true);
        const responseGetOrder = await getDataApi(`${pathUrlModule}/${id}`, {}, 'GET');
        const { icon: iconResponse, errors, msg, data } = await responseGetOrder.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, router, 'Error de Búsqueda', errors, 'list-order');
            return;
        }

        setOrder(data);
        showErrorsAlert(iconResponse, null, msg, [], '', true);
        setLoading(false);
    };

    const deleteOrder = async (id) => {
        setLoading(true);
        const responseDeleteOrder = await getDataApi(`${pathUrlModule}/${id}`, {}, 'DELETE');
        const { icon: iconResponse, errors } = await responseDeleteOrder.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, 'Error de Eliminación', errors);
            return;
        }

        setLoading(false);
        listOrder();
    };

    return {
        orders,
        order,
        loading,
        setSearchTerm,
        hasOrders,

        totalPages,
        prevPage,
        nextPage,
        totalDocs,

        createOrUpdate,
        listOrder,
        getItem,
        deleteOrder
    }
});