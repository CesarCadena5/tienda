import { getDataApi } from "@/helpers/getDataApi";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const statusAuth = ref(false);
    const iconAuth = ref('');
    const msgAuth = ref('');
    const loading = ref(false);
    const isValidToken = ref(false);

    const setLoading = (value) => {
        loading.value = value;
    }

    const setMsgAuth = (value) => {
        msgAuth.value = value;
    };

    const setValidToken = (value) => {
        isValidToken.value = value;
    };

    const setIconAuth = (value) => {
        iconAuth.value = value;
    };

    const setStatusAuth = (value) => {
        statusAuth.value = value;
    }

    const login = async (email, password) => {
        setLoading(true);
        const data = { email, password };

        const responseLogin = await getDataApi('auth/login', data);
        const { icon, msg, error } = await responseLogin.json();
        if (!responseLogin.ok) {
            setMsgAuth(error);
            setLoading(false);
            return;
        }

        setStatusAuth(true);
        setIconAuth(icon);
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
        iconAuth,
        msgAuth,
        isValidToken,

        // methods
        login,
        validateAuthUser
    }
});