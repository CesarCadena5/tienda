<template>
    <div class="vh-100 d-flex flex-column align-items-center">
        <div class="row w-100 mt-5 d-flex flex-column align-items-center">
            <div class="col-12 col-md-7 col-lg-6 px-4">
                <div class="alert alert-primary" role="alert">
                    <h4 class="text-center">¡BIENVENIDO, {{ authStore.nameUser.toUpperCase() }}!</h4>
                </div>
            </div>
        </div>
        <div class="row w-100 d-flex flex-column align-items-center">
            <div class="col-12 col-md-7 col-lg-6 shadow d-flex flex-wrap justify-content-around">
                <div class="alert alert-secondary w-45 position-relative" role="alert">
                    <router-link :to="{name: 'list-category'}" class="d-flex align-items-center gap-2">
                        <img src="@/assets/svgs/category.svg" alt="Icon Categories" class="icon-height">
                        Categorías
                    </router-link>
                    <span class="position-absolute top-0 start-100 bg-info translate-middle badge rounded-pill bg-danger">
                        {{categoriesStore.totalDocs}}
                    </span>
                </div>
                <div class="alert alert-success w-45 position-relative" role="alert">
                    <router-link :to="{name: 'list-supplier'}" class="d-flex align-items-center gap-2">
                        <img src="@/assets/svgs/supplier.svg" alt="Icon Supplier" class="icon-height">
                        Proveedores
                    </router-link>
                    <span class="position-absolute top-0 start-100 bg-info translate-middle badge rounded-pill bg-danger">
                        {{suppliersStore.totalDocs}}
                    </span>
                </div>
                <div class="alert alert-danger w-45 position-relative" role="alert">
                    <router-link :to="{name: 'list-customer'}" class="d-flex align-items-center gap-2">
                        <img src="@/assets/svgs/customer.svg" alt="Icon Customer" class="icon-height">
                        Clientes
                    </router-link>
                    <span class="position-absolute top-0 start-100 bg-info translate-middle badge rounded-pill bg-danger">
                        {{customersStore.totalDocs}}
                    </span>
                </div>
                <div class="alert alert-dark w-45 position-relative" role="alert">
                    <router-link :to="{name: 'list-product'}" class="d-flex align-items-center gap-2">
                        <img src="@/assets/svgs/product-icon.svg" alt="Icon Products" class="icon-height">
                        Productos
                    </router-link>
                    <span class="position-absolute top-0 start-100 bg-info translate-middle badge rounded-pill bg-danger">
                        {{productsStore.totalDocs}}
                    </span>
                </div>
                <div class="alert alert-warning w-45 position-relative" role="alert">
                    <router-link :to="{name: 'list-order'}" class="d-flex align-items-center gap-2">
                        <img src="@/assets/svgs/orders.svg" alt="Icon Orders" class="icon-height">
                        Pedidos
                    </router-link>
                    <span class="position-absolute top-0 start-100 bg-info translate-middle badge rounded-pill bg-danger">
                        {{ordersStore.totalDocs}}
                    </span>
                </div>
                <div class="alert alert-info w-45 position-relative" role="alert">
                    <router-link :to="{name: 'list-sale'}" class="d-flex align-items-center gap-2">
                        <img src="@/assets/svgs/sale.svg" alt="Icon Sales" class="icon-height">
                        Ventas
                    </router-link>
                    <span class="position-absolute top-0 start-100 bg-info translate-middle badge rounded-pill bg-danger">
                        {{salesStore.totalDocs}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { useCategoriesStore } from '../../categories/store/categories.store';
import { useSupplierStore } from '@/modules/suppliers/store/suppliers.store';
import { useCustomerStore } from '@/modules/customers/store/customers.store';
import { useProductStore } from '@/modules/products/store/products.store';
import { useOrderStore } from '@/modules/orders/store/orders.store';
import { useSaleStore } from '@/modules/sales/store/sales.store';

const authStore = useAuthStore();
const salesStore = useSaleStore();
const ordersStore = useOrderStore();
const productsStore = useProductStore();
const suppliersStore = useSupplierStore();
const customersStore = useCustomerStore();
const categoriesStore = useCategoriesStore();

onMounted(() => {
    salesStore.listSale();
    ordersStore.listOrder();
    productsStore.listProduct();
    suppliersStore.listSupplier();
    customersStore.listCustomer();
    categoriesStore.listCategory();
});
</script>

<style scoped>
.w-45 {
    width: 45% !important;
}

a {
    text-decoration: none;
}

.icon-height {
    height: 20px;
}
</style>