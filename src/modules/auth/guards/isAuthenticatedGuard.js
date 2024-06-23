import { useAuthStore } from "../store/auth.store"

const isAuthenticatedGuard = async (to, from, next) => {
    const authStore = useAuthStore();
    await authStore.validateAuthUser();

    if (!authStore.isValidToken && !authStore.statusAuth) {
        console.log('aqui')
        return next({
            name: 'login'
        });
    }

    return next();
}

export default isAuthenticatedGuard