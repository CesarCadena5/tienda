<template>
    <div class="row min-vh-100 p-4">
        <div class="col-12 d-flex justify-content-center position-relative">
            <img src="@/assets/svgs/404.svg" alt="Not Found Icon" class="img-fluid">
            <h3 class="position">
                Ups, parece que no existe lo que buscas 😓
                <router-link :to="{name: 'home'}" class="btn btn-primary rounded-pill">
                    Regresar
                </router-link>
            </h3>
        </div>
    </div>
</template>

<style scoped>
.position{
    position: absolute;
    top: 23%;
}
</style>