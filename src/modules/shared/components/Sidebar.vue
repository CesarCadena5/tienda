<template>
    <aside>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header d-flex justify-content-between">
                <h5 class="offcanvas-title d-flex align-items-center gap-1" id="offcanvasExampleLabel">
                    {{ authStore.nameUser.toUpperCase() }}
                    <img src="@/assets/svgs/store-icon.svg" alt="Icon Store" class="icon-height">
                </h5>
                <img src="@/assets/svgs/close-menu.svg" alt="Icon Close Menu" data-bs-dismiss="offcanvas" aria-label="Close" class="icon-close">
            </div>
            <div class="offcanvas-body d-flex flex-column justify-content-between">
                <div class="list-group mt-2">
                    <li class="list-group-item list-group-item-action list-group-item-info">
                        <router-link :to="{name: 'list-product'}" class="d-flex align-items-center gap-2">
                            <img src="@/assets/svgs/product-icon.svg" alt="Icon Products" class="icon-height">
                            Productos
                        </router-link>
                    </li>
                    <li class="list-group-item list-group-item-action list-group-item-info">
                        <router-link :to="{name: 'list-category'}" class="d-flex align-items-center gap-2">
                            <img src="@/assets/svgs/category.svg" alt="Icon Categories" class="icon-height">
                            Categorías
                        </router-link>
                    </li>
                    <li class="list-group-item list-group-item-action list-group-item-info">
                        <router-link :to="{name: 'home'}" class="d-flex align-items-center gap-2">
                            <img src="@/assets/svgs/sale.svg" alt="Icon Sales" class="icon-height">
                            Ventas
                        </router-link>
                    </li>
                    <li class="list-group-item list-group-item-action list-group-item-info">
                        <router-link :to="{name: 'home'}" class="d-flex align-items-center gap-2">
                            <img src="@/assets/svgs/orders.svg" alt="Icon Orders" class="icon-height">
                            Pedidos
                        </router-link>
                    </li>
                    <li class="list-group-item list-group-item-action list-group-item-info">
                        <router-link :to="{name: 'list-supplier'}" class="d-flex align-items-center gap-2">
                            <img src="@/assets/svgs/supplier.svg" alt="Icon Supplier" class="icon-height">
                            Proveedores
                        </router-link>
                    </li>
                    <li class="list-group-item list-group-item-action list-group-item-info">
                        <router-link :to="{name: 'home'}" class="d-flex align-items-center gap-2">
                            <img src="@/assets/svgs/customer.svg" alt="Icon Customer" class="icon-height">
                            Clientes
                        </router-link>
                    </li>
                    <li class="list-group-item list-group-item-action list-group-item-info">
                        <router-link :to="{name: 'home'}" class="d-flex align-items-center gap-2">
                            <img src="@/assets/svgs/home.svg" alt="Icon Home" class="icon-height">
                            Inicio
                        </router-link>
                    </li>
                </div>

                <div class="btn-group dropup">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Perfil
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <router-link :to="{name: 'home'}" class="d-flex align-items-center gap-2 dropdown-item">
                                <img src="@/assets/svgs/user-edit.svg" alt="User Edit" class="icon-height">
                                Actualizar
                            </router-link>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <router-link :to="{name: 'home'}" class="d-flex align-items-center gap-2 dropdown-item">
                                <img src="@/assets/svgs/logout-icon.svg" alt="Icon logout" class="icon-height">
                                Salir
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { useAuthStore } from '@/modules/auth/store/auth.store';

const authStore = useAuthStore();
</script>

<style scoped>
.icon-close {
    height: 45px;
    cursor: pointer;
}

.icon-height {
    height: 20px;
}

.offcanvas {
    width: 260px;
}

a{
    text-decoration: none;
}
</style>