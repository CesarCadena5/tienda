<template>
    <div class="row align-items-center justify-content-around min-vh-100 px-2">
        <div class="col-12 col-lg-6 d-lg-block d-none">
            <img src="@/assets/svgs/login-image.svg" alt="Image login" class="img-fluid p-2">
        </div>
        <div class="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center">
            <form class="shadow p-3 w-100 w-md-75 p-lg-4 rounded">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Correo</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3 form-check">
                    <!-- <input type="checkbox" class="form-check-input" id="exampleCheck1"> -->
                    <label class="form-check-label" for="exampleCheck1">¿Necesitas una cuenta?</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="col-12 position-absolute bottom-0 start-0 p-0">
            <img src="@/assets/svgs/wave-login.svg" alt="Wave login" class="img-fluid">
        </div>
    </div>
</template>