import { defineComponent, computed, defineAsyncComponent } from "vue";
import LoginImage from '@/assets/svgs/login-image.svg';
import RegisterImage from '@/assets/svgs/register-image.svg';
import UserAdd from '@/assets/svgs/user-add-icon.svg';
import UserLogin from '@/assets/svgs/login-icon.svg';

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
        const imgSrc = computed(() => {
            return props.title === 'Login' ? LoginImage : RegisterImage;
        });

        const imgAvatarSrc = computed(() => {
            return props.title === 'Login' ? UserLogin : UserAdd;
        });

        const msgAuth = computed(() => {
            return props.title === 'Login' ? 'Bienvenido' : 'Registrate';
        });

        return {
            imgSrc,
            imgAvatarSrc,
            msgAuth
        }
    }
});