import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { getDataApi } from "@/helpers/getDataApi";
import { showErrorsAlert } from "@/helpers/showErrorsAlert";

export const useProductStore = defineStore('products', () => {
    const router = useRouter();
    const products = ref([]);
    const product = ref({
        _id: null,
        name: '',
        description: '',
        purchasePrice: '',
        salePrice: '',
        stock: '',
        category: {},
        supplier: {}
    });
    const loading = ref(false);
    const searchTerm = ref('');
    const pathUrlModule = 'product';

    // pagination
    const nextPage = ref(null);
    const prevPage = ref(null);
    const totalPages = ref(0);
    const totalDocs = ref(0);

    const setLoading = (value) => {
        loading.value = value;
    }

    const setProducts = (value) => {
        products.value = value;
    }

    const setProduct = (value) => {
        product.value = value;
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

    const hasProducts = computed(() => products.value.length > 0);

    // methods
    const createOrUpdateProduct = async (values) => {
        setLoading(true);

        const finishPath = !product.value._id ? '/create' : `/${product.value._id}`;
        const method = !product.value._id ? 'POST' : 'PUT';

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

        showErrorsAlert(iconResponse, router, msg, [], 'list-product');
    };

    const listProduct = async (page = 1, limit = 5) => {
        setLoading(true);
        const urlPath = `${pathUrlModule}/list?page=${page}&limit=${limit}&search=${searchTerm.value}`;

        const responseList = await getDataApi(urlPath, {}, 'GET');
        const { icon: iconResponse, data, error } = await responseList.json();

        if (error) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, error);
            setProducts([]);
            return;
        }

        setProduct({ _id: null, name: '' });

        setProducts(data.docs);
        setTotalPages(data.totalPages);
        setTotalDocs(data.totalDocs);
        setPrevPage(data.prevPage);
        setNextPage(data.nextPage);
        setLoading(false);
    };

    const getProduct = async (id) => {
        setLoading(true);
        const responseGetProduct = await getDataApi(`${pathUrlModule}/${id}`, {}, 'GET');
        const { icon: iconResponse, errors, msg, data } = await responseGetProduct.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, router, 'Error de Búsqueda', errors, 'list-product');
            return;
        }

        setProduct(data);
        showErrorsAlert(iconResponse, null, msg, [], '', true);
        setLoading(false);
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        const responseDeleteProduct = await getDataApi(`${pathUrlModule}/${id}`, {}, 'DELETE');
        const { icon: iconResponse, errors } = await responseDeleteProduct.json();

        if (errors && errors.length > 0) {
            setLoading(false);
            showErrorsAlert(iconResponse, null, 'Error de Eliminación', errors);
            return;
        }

        setLoading(false);
        listProduct();
    };

    return {
        products,
        product,
        loading,
        setSearchTerm,
        hasProducts,

        totalPages,
        prevPage,
        nextPage,
        totalDocs,

        createOrUpdateProduct,
        listProduct,
        getProduct,
        deleteProduct
    }
});