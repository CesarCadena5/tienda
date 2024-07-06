import Loading from '@/modules/shared/components/Loading.vue';

import { useSaleStore } from '@/modules/sales/store/sales.store';
import { useOrderStore } from '@/modules/orders/store/orders.store';
import { useProductStore } from '@/modules/products/store/products.store';
import { useSupplierStore } from '@/modules/suppliers/store/suppliers.store';
import { useCustomerStore } from '@/modules/customers/store/customers.store';

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
        },
        typeStorePerson: {
            type: String,
            default: 'supplier'
        },
        typeStoreModule: {
            type: String,
            default: 'order'
        }
    },
    components: {
        Field,
        ErrorMessage,
        Loading
    },
    setup: (props) => {
        const totalEvent = ref(0);
        const debounceTimeout = ref();

        const productsStore = useProductStore();

        const typePersonStore = props.typeStorePerson === 'supplier' ? useSupplierStore() : useCustomerStore();
        const storeModule = props.typeStoreModule === 'order' ? useOrderStore() : useSaleStore();

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

        const nameInputTotal = computed(() => props.typeStorePerson === 'supplier' ? 'totalPurchase' : 'totalSale');
        const nameInputStatus = computed(() => props.typeStorePerson === 'supplier' ? 'statusOrder' : 'statusSale');

        const { handleSubmit, resetForm } = useForm({});
        const { remove, push, fields, update } = useFieldArray('products');

        const onSubmit = handleSubmit(values => {
            storeModule.createOrUpdate(values);
        });

        const validateTypePerson = value => value ? true : 'Campo requerido.';
        const validateStatusOrder = value => value ? true : 'El estado del evento es requerido.';
        const validateTotal = value => value ? true : 'Debes agregar productos.';

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
            totalEvent.value = fields.value.reduce((acc, cur) => acc + cur.value.totalPrice, 0);
        }

        const titleTypePerson = computed(() => {
            return props.typeStorePerson === 'supplier' ? 'supplier' : 'customer';
        });

        onMounted(() => {
            props.typeStorePerson === 'supplier' ? typePersonStore.listSupplier() : typePersonStore.listCustomer();
        });

        watch(
            () => props.id,
            async (newId) => {
                if (newId) {
                    await storeModule.getItem(newId);
                    resetForm({
                        values: {
                            products: storeModule[props.typeStoreModule].products,
                            [titleTypePerson.value]: storeModule[props.typeStoreModule][props.typeStorePerson]._id,
                            [nameInputTotal.value]: storeModule[props.typeStoreModule][nameInputTotal.value],
                            [nameInputStatus.value]: storeModule[props.typeStoreModule][nameInputStatus.value],
                            additionalNote: props.typeStoreModule === 'sale' ? storeModule[props.typeStoreModule].additionalNote : null
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
            typePersonStore,
            storeModule,
            onSubmit,
            titleTypePerson,
            nameInputTotal,
            nameInputStatus,
            handleChangeQuantity,
            setProductSelected,
            validateStatusOrder,
            validateTypePerson,
            validateTotal,
            totalEvent,
            remove,
            push,
            searchTerm,
            Field,
            fields,
            ErrorMessage
        }
    }
})