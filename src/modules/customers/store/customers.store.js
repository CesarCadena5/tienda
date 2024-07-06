import { getDataApi } from "@/helpers/getDataApi";
import { showErrorsAlert } from "@/helpers/showErrorsAlert";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export const useCustomerStore = defineStore('customer', () => {
    const router = useRouter();
    const customers = ref([]);
    const customer = ref({
        _id: null,
        name: '',
        phoneNumber: ''
    });
    const loading = ref(false);
    const searchTerm = ref('');
    const pathUrlModule = 'customer';

    // pagination
    const nextPage = ref(null);
    const prevPage = ref(null);
    const totalPages = ref(0);
    const totalDocs = ref(0);

    const setLoading = (value) => {
        loading.value = value;
    }

    const setCustomers = (value) => {
        customers.value = value;
    }

    const setCustomer = (value) => {
        customer.value = value;
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

    const hasCustomers = computed(() => customers.value.length > 0);
    const inputValuesSelect = computed(() => {
        const options = customers.value.map(customer => ({
            value: customer._id,
            text: customer.name
        }));

        options.unshift({ value: '', text: 'Selecciona' });
        return options;
    });

    // methods
    const createOrUpdateCustomer = async (values) => {
        setLoading(true);

        const finishPath = !customer.value._id ? '/create' : `/${customer.value._id}`;
        const method = !customer.value._id ? 'POST' : 'PUT';

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

        showErrorsAlert(iconResponse, router, msg, [], 'list-customer');
    };

    const listCustomer = async (page = 1, limit = 5) => {
        setLoading(true);
        const urlPath = `${pathUrlModule}/list?page=${page}&limit=${limit}&search=${searchTerm.value}`;

        const responseList = await getDataApi(urlPath, {}, 'GET');
        const { icon: iconResponse, data, error } = await responseList.json();

        if (error) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, error);
            setCustomers([]);
            return;
        }

        setCustomer({ _id: null, name: '', phoneNumber: '' });

        setCustomers(data.docs);
        setTotalPages(data.totalPages);
        setTotalDocs(data.totalDocs);
        setPrevPage(data.prevPage);
        setNextPage(data.nextPage);
        setLoading(false);
    };

    const getCustomer = async (id) => {
        setLoading(true);
        const responseGetCustomer = await getDataApi(`${pathUrlModule}/${id}`, {}, 'GET');
        const { icon: iconResponse, errors, msg, data } = await responseGetCustomer.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, router, 'Error de Búsqueda', errors, 'list-customer');
            return;
        }

        setCustomer(data);
        showErrorsAlert(iconResponse, null, msg, [], '', true);
        setLoading(false);
    };

    const deleteCustomer = async (id) => {
        setLoading(true);
        const responseDeleteCustomer = await getDataApi(`${pathUrlModule}/${id}`, {}, 'DELETE');
        const { icon: iconResponse, errors } = await responseDeleteCustomer.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, 'Error de Eliminación', errors);
            return;
        }

        setLoading(false);
        listCustomer();
    };

    return {
        customers,
        customer,
        loading,
        hasCustomers,
        totalDocs,
        setSearchTerm,
        inputValuesSelect,

        totalPages,
        prevPage,
        nextPage,

        createOrUpdateCustomer,
        listCustomer,
        deleteCustomer,
        getCustomer
    }
});