import { useAuthStore } from "../store/auth.store"

const isAuthenticatedGuard = async (to, from, next) => {
    const authStore = useAuthStore();
    await authStore.validateAuthUser();

    if (!authStore.isValidToken && !authStore.statusAuth) {
        return next({
            name: 'login'
        });
    }

    return next();
}

export default isAuthenticatedGuard