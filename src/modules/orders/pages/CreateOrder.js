import { useOrderStore } from '../store/orders.store';
import Loading from '@/modules/shared/components/Loading.vue';
import { useSaleStore } from '@/modules/sales/store/sales.store';
import { useSupplierStore } from '../../suppliers/store/suppliers.store';
import { useProductStore } from '@/modules/products/store/products.store';
import { Field, useForm, useFieldArray, ErrorMessage } from 'vee-validate';
import { useCustomerStore } from '@/modules/customers/store/customers.store';
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
        const totalPurchase = ref(0);
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
            totalPurchase.value = fields.value.reduce((acc, cur) => acc + cur.value.totalPrice, 0);
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
                            totalPurchase: storeModule[props.typeStoreModule].totalPurchase,
                            statusOrder: storeModule[props.typeStoreModule].statusOrder,
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
            handleChangeQuantity,
            setProductSelected,
            totalPurchase,
            validateStatusOrder,
            validateTypePerson,
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