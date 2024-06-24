<template>
    <div class="row align-items-center justify-content-around min-vh-100 px-2">
        <Loading v-if="authStore.loading"/>
        <div class="col-12 col-lg-6 d-lg-block d-none">
            <img :src="imgSrc" alt="Image login" class="img-fluid p-2">
        </div>
        <div class="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center">
            <form
                @submit.prevent="handleAuth" 
                class="shadow p-3 w-100 w-md-75 p-lg-4 rounded">
                <div class="mb-1 w-25 mx-auto d-flex flex-column align-items-center">
                    <img :src="imgAvatarSrc" class="img-fluid height-avatar" alt="Svg Auth">
                    <h4>{{ msgAuth }}</h4>
                </div>
                <!-- <slot name="input-register"/> -->
                <div class="mb-3" v-if="title !== 'Login'">
                    <label for="exampleInputName" class="form-label">Nombre</label>
                    <input type="text" @input="handleChangeName" class="form-control" id="exampleInputName" aria-describedby="nameHelp">
                    <div id="nameHelp" class="form-text" v-if="showMsgNameError">El nombre es requerido</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Correo</label>
                    <input type="email" @input="handleChangeEmail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text" v-if="showMsgEmailError">Escribe un correo válido.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                    <input type="password" @input="handleChangePassword" class="form-control" id="exampleInputPassword1">
                    <div id="emailHelp" class="form-text" v-if="showMsgPasswordError">Mínimo 1 mayúscula, 1 minúscula, 1 dígito, 1 carácter especial y longitud de 8.</div>
                </div>
                <div class="mb-3">
                    <slot name="route-auth"/>
                </div>
                <button type="submit" :disabled="!enableButtomSubmit" class="btn btn-primary">{{ title }}</button>
                <div class="mt-2" v-if="authStore.msgAuth">
                    <h6 class="text-center">{{ authStore.msgAuth }}</h6>
                </div>
            </form>
        </div>
        <div class="col-12 position-absolute z-n1 bottom-0 start-0 p-0">
            <img src="@/assets/svgs/wave-login.svg" alt="Wave login" class="img-fluid">
        </div>
    </div>
</template>

<script src="./AuthSlot.js"></script>

<style scoped>
.height-avatar {
    height: 50px;
}
</style>