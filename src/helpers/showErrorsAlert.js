import Swal from 'sweetalert2';

export const showErrorsAlert = (icon, router = null, title = '', errors = [], route = '', list = false) => {
    const errorMsg = errors.length > 0 ?
        `<ul>${errors.reduce((msg, { msg: errorMsg }) => `${msg}<li>${errorMsg}</li>`, '')}</ul>` : '';

    const configSwal = {
        icon,
        html: errorMsg,
        title,
        allowOutsideClick: icon === 'success' ? false : true,
    };

    Swal.fire(configSwal).then((result) => {
        if (icon === 'success' && !list && result.isConfirmed) {
            router.replace({ name: route });
        }
    });
}