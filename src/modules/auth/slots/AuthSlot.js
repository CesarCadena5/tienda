import { defineComponent, computed, defineAsyncComponent, ref } from "vue";
import { useAuthStore } from "../store/auth.store";
import UserLogin from '@/assets/svgs/login-icon.svg';
import UserAdd from '@/assets/svgs/user-add-icon.svg';
import LoginImage from '@/assets/svgs/login-image.svg';
import RegisterImage from '@/assets/svgs/register-image.svg';
import { useRouter } from "vue-router";

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        }
    },
    components: {
        Loading: defineAsyncComponent(() => import("@/modules/shared/components/Loading.vue"))
    },
    setup: (props) => {
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const showMsgNameError = ref(false);
        const showMsgEmailError = ref(false);
        const showMsgPasswordError = ref(false);
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        const router = useRouter();

        const authStore = useAuthStore();

        // props computed
        const imgSrc = computed(() => {
            return props.title === 'Login' ? LoginImage : RegisterImage;
        });

        const imgAvatarSrc = computed(() => {
            return props.title === 'Login' ? UserLogin : UserAdd;
        });

        const msgAuth = computed(() => {
            return props.title === 'Login' ? 'Bienvenido' : 'Registrate';
        });

        const enableButtomSubmit = computed(() => {
            if (regexEmail.test(email.value) && regexPassword.test(password.value)) {
                return true;
            }

            return false;
        });

        // methods
        const handleAuth = async () => {
            if (enableButtomSubmit && props.title === 'Login') {
                await authStore.login(email.value, password.value);
                if (authStore.statusAuth) {
                    console.log('entra')
                    router.replace({ name: 'home' });
                }
            } else {

            }
        }

        const handleChangeEmail = ({ target }) => {
            validateFields(!regexEmail.test(target.value), email, showMsgEmailError, target.value);
        };

        const handleChangePassword = ({ target }) => {
            validateFields(!regexPassword.test(target.value), password, showMsgPasswordError, target.value);
        };

        const validateFields = (condition, field, fieldMsgError, value) => {
            if (condition) {
                fieldMsgError.value = true;
                field.value = value;
            } else {
                fieldMsgError.value = false;
                field.value = value;
            }
        }

        return {
            // props
            imgSrc,
            imgAvatarSrc,
            msgAuth,
            name, email, password,
            enableButtomSubmit,
            showMsgEmailError,
            showMsgPasswordError,
            showMsgNameError,

            // methods
            handleAuth,
            handleChangeEmail,
            handleChangePassword,

            // store
            authStore
        }
    }
});