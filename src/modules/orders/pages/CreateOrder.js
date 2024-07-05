import { useOrderStore } from '../store/orders.store';
import Loading from '@/modules/shared/components/Loading.vue';
import { useSupplierStore } from '../../suppliers/store/suppliers.store';
import { useProductStore } from '@/modules/products/store/products.store';
import { Field, useForm, useFieldArray, ErrorMessage } from 'vee-validate';
import { onMounted, ref, nextTick, computed, defineComponent, watch } from 'vue';

export default defineComponent({
    props: {
        id: {
            type: String,
            default: ''
        },
        view: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Field,
        ErrorMessage,
        Loading
    },
    setup: (props) => {
        const totalPurchase = ref(0);
        const productsStore = useProductStore();
        const suppliersStore = useSupplierStore();
        const ordersStore = useOrderStore();
        const debounceTimeout = ref();

        const searchTerm = computed({
            get() { },
            set(value) {
                if (debounceTimeout.value) clearTimeout(debounceTimeout.value);

                debounceTimeout.value = setTimeout(() => {
                    productsStore.setSearchTerm(value);
                    productsStore.listProduct();
                }, 500);
            }
        });

        const { handleSubmit, resetForm } = useForm({});
        const { remove, push, fields, update } = useFieldArray('products');

        const onSubmit = handleSubmit(values => {
            ordersStore.createOrUpdateOrder(values);
        });

        const validateSupplier = (value) => {
            if (!value) {
                return 'El proveedor es requerido.';
            }
            return true;
        };

        const validateStatusOrder = (value) => {
            if (!value) {
                return 'El estado del pedido es requerido.';
            }
            return true;
        };

        const validateTotal = (value) => {
            if (!value) {
                return 'Debe agregar productos.';
            }
            return true;
        }

        const setProductSelected = ({ target }, index) => {
            const selectedProduct = productsStore.inputValuesSelect.find(product => product.text === target.value);
            if (selectedProduct) {
                update(index, {
                    productId: selectedProduct.id,
                    name: selectedProduct.text,
                    quantity: selectedProduct.quantity,
                    priceUnit: selectedProduct.priceUnit,
                    totalPrice: 0
                });
            }
        };

        const handleChangeQuantity = async ({ target }, index) => {
            const totalPrice = fields.value[index].value.priceUnit * target.value;
            update(index, {
                ...fields.value[index].value,
                priceUnit: fields.value[index].value.priceUnit,
                quantity: target.value,
                totalPrice
            });

            await nextTick();
            totalPurchase.value = fields.value.reduce((acc, cur) => {
                return acc + cur.value.totalPrice;
            }, 0);
        }

        onMounted(() => {
            suppliersStore.listSupplier();
        });

        watch(
            () => props.id,
            async (newId) => {
                if (newId) {
                    await ordersStore.getOrder(newId);
                    resetForm({
                        values: {
                            products: ordersStore.order.products,
                            supplier: ordersStore.order.supplier._id,
                            totalPurchase: ordersStore.order.totalPurchase,
                            statusOrder: ordersStore.order.statusOrder
                        }
                    });
                }
            },
            {
                immediate: true
            }
        );

        return {
            productsStore,
            suppliersStore,
            ordersStore,
            onSubmit,
            handleChangeQuantity,
            setProductSelected,
            totalPurchase,
            validateStatusOrder,
            validateSupplier,
            validateTotal,
            remove,
            push,
            searchTerm,
            Field,
            fields,
            ErrorMessage
        }
    }
})