<template>
    <section class="row d-flex justify-content-center">
        <Loading v-if="ordersStore.loading" />
        <div class="col-12 col-lg-10 shadow p-3 mt-3">
            <form @submit="onSubmit">
                <div class="mb-3">
                    <label for="supplier" class="form-label">Proveedor</label>
                    <Field name="supplier" as="select" class="form-select" :disabled="view" :rules="validateSupplier">
                        <option 
                            v-for="supplier in suppliersStore.inputValuesSelect"
                            :key="supplier.value" :value="supplier.value">
                                {{ supplier.text }}
                        </option>
                    </Field>
                    <ErrorMessage name="supplier"/>
                </div>
                <div class="mb-3">
                    <label for="totalPurchase" class="form-label">Total</label>
                    <Field type="number" name="totalPurchase" :rules="validateTotal" v-model="totalPurchase" readonly disabled class="form-control" id="totalPurchase" placeholder="0"/>
                    <ErrorMessage name="totalPurchase"/>
                </div>
                <div class="mb-3">
                    <label for="statusOrder" class="form-label">Estado del Pedido</label>
                    <Field name="statusOrder" as="select" class="form-select" :disabled="view" :rules="validateStatusOrder">
                        <option value="">Selecciona</option>
                        <option value="pagada">Pagado</option>
                        <option value="cancelada">Cancelado</option>
                        <option value="pendiente">Pendiente</option>
                    </Field>
                    <ErrorMessage name="statusOrder"/>
                </div>
                <div class="mb-3">
                    <div v-for="(field, index) in fields" :key="field.key">
                        <div class="col-12 d-flex flex-wrap bg-body-secondary rounded mt-1 p-1">
                            <div class="col-6 col-md-4">
                                <label for="product" class="form-label">Producto</label>
                                <Field 
                                    class="form-control" 
                                    :name="`products[${index}].name`" 
                                    v-model="searchTerm"
                                    list="listProducts"
                                    id="product" 
                                    placeholder="Busca aquí"
                                    :disabled="view"
                                    @input="(event) => setProductSelected(event, index)"
                                    autocomplete="off"
                                />
                                <datalist id="listProducts">
                                    <option v-for="product in productsStore.inputValuesSelect"
                                    :key="product.value" :value="product.text"/>
                                </datalist>
                            </div>
                            <div class="col-6 col-md-3">
                                <label for="quantity" class="form-label">Cantidad</label>
                                <Field type="number" :name="`products[${index}].quantity`" :disabled="view" class="form-control" id="quantity" @input="(event) => handleChangeQuantity(event, index)"/>
                            </div>
                            <div class="col-6 col-md-2">
                                <label for="priceUnit" class="form-label">Precio Unitario</label>
                                <Field type="number" readonly disabled :name="`products[${index}].priceUnit`" class="form-control" id="priceUnit"/>
                            </div>
                            <div class="col-6 col-md-2">
                                <label for="totalPrice" class="form-label">Precio Total</label>
                                <Field type="number" readonly disabled :name="`products[${index}].totalPrice`" class="form-control"/>
                            </div>
                            <div class="col-6 col-md-1 d-flex align-items-end">
                                <button class="btn btn-info" :disabled="view" type="button" @click="remove(index)">
                                    <img src="@/assets/svgs/delete-product.svg" alt="Delete Icon" class="height-icon">
                                </button>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-success mt-2" :disabled="view" type="button" @click="push({ productId: '', quantity: 0, priceUnit: 0, totalPurchase: 0  })">
                        Producto
                        <img src="@/assets/svgs/add-product.svg" alt="Add Icon" class="height-icon">
                    </button>
                </div>
                <button class="btn btn-outline-primary" :disabled="view">Guardar</button>
            </form>
        </div>
    </section>
</template>
<script src="./CreateOrder.js">
</script>