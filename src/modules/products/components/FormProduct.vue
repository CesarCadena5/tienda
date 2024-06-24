<template>
    <form class="row d-flex gy-2">
        <div class="col-12">
            <label for="nameProduct" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nameProduct" placeholder="Yogurt, Choclitos...">
        </div>
        <div class="col-12">
            <label for="description" class="form-label">Descripción</label>
            <textarea class="form-control" id="description" placeholder="Escribe alguna nota"></textarea>
        </div>
        <div class="col-12 col-sm-6">
            <label for="purchasePrice" class="form-label">Precio de Compra</label>
            <input type="number" class="form-control" id="purchasePrice" placeholder="100">
        </div>
        <div class="col-12 col-sm-6">
            <label for="salePrice" class="form-label">Precio de Venta</label>
            <input type="number" class="form-control" id="salePrice" placeholder="100">
        </div>
        <div class="col-12 col-sm-6">
            <label for="stock" class="form-label">Stock</label>
            <input type="number" class="form-control" id="stock" placeholder="10">
        </div>
        <div class="col-12 col-sm-6">
            <label for="category" class="form-label">Categoría</label>
            <select id="category" class="form-select">
                <option selected>Selecciona...</option>
                <option>2</option>
                <option>1</option>
            </select>
        </div>
        <div class="col-12">
            <label for="supplier" class="form-label">Proveedor</label>
            <select id="supplier" class="form-select">
                <option selected>Selecciona...</option>
                <option>2</option>
                <option>1</option>
            </select>
        </div>
        <div class="col-12">
            <button type="submit" class="btn btn-outline-success">{{ titleBtn }}</button>
        </div>
    </form>
</template>

<script setup>
const props = defineProps({
    titleBtn: {
        type: String,
        default: 'Crear'
    }
});
</script>