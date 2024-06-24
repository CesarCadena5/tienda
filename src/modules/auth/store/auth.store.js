import { ref } from "vue";
import { defineStore } from "pinia";
import { getDataApi } from "@/helpers/getDataApi";
import { showErrorsAlert } from "@/helpers/showErrorsAlert";

export const useAuthStore = defineStore('auth', () => {
    const statusAuth = ref(false);
    const nameUser = ref(false);
    const msgAuth = ref('');
    const loading = ref(false);
    const isValidToken = ref(false);

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
            showErrorsAlert(errors);
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
        const { tokenValid } = await responseValidate.json();

        if (tokenValid) {
            setValidToken(true);
            setStatusAuth(true);
        } else {
            setValidToken(false);
            setStatusAuth(false);
        }
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
        validateAuthUser
    }
});