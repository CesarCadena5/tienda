import { ref } from "vue";
import { defineStore } from "pinia";
import { getDataApi } from "@/helpers/getDataApi";
import { showErrorsAlert } from "@/helpers/showErrorsAlert";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {
    const statusAuth = ref(false);
    const nameUser = ref('');
    const msgAuth = ref('');
    const loading = ref(false);
    const isValidToken = ref(false);
    const router = useRouter();

    const setLoading = (value) => {
        loading.value = value;
    }

    const setMsgAuth = (value) => {
        msgAuth.value = value;
    };

    const setNameUser = (value) => {
        nameUser.value = value;
    };

    const setValidToken = (value) => {
        isValidToken.value = value;
    };

    const setStatusAuth = (value) => {
        statusAuth.value = value;
    }

    const loginOrSignup = async (email, password, name = '') => {
        setLoading(true);
        const data = { email, password, name };
        const urlPath = name === '' ? 'auth/login' : 'auth/register'

        const responseLogin = await getDataApi(urlPath, data);
        const { msg, error, errors, userName } = await responseLogin.json();

        if (errors && errors.length > 0) {
            showErrorsAlert(errors, null, 'Errores de validación', errors);
            setLoading(false);
            return;
        }

        if (!responseLogin.ok) {
            setMsgAuth(error);
            setLoading(false);
            return;
        }

        setNameUser(userName);
        setStatusAuth(true);
        setMsgAuth(msg);
        setLoading(false);
    };

    const validateAuthUser = async () => {
        setLoading(true);
        const responseValidate = await getDataApi('auth/validate-token', {}, 'GET');
        const { tokenValid, nameUser } = await responseValidate.json();

        if (tokenValid) {
            setValidToken(true);
            setStatusAuth(true);
            setNameUser(nameUser);
        } else {
            setValidToken(false);
            setStatusAuth(false);
        }
        setLoading(false);
    }

    const logout = async () => {
        setLoading(true);

        const responseLogout = await getDataApi('auth/logout');
        const { msg } = await responseLogout.json();

        setNameUser('');
        setMsgAuth('');
        setStatusAuth(false);
        router.replace({ name: 'login' });
        setLoading(false);
    }

    return {
        statusAuth,
        loading,
        nameUser,
        msgAuth,
        isValidToken,

        // methods
        loginOrSignup,
        logout,
        validateAuthUser
    }
});