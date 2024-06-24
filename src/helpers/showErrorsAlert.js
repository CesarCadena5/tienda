import Swal from 'sweetalert2';

export const showErrorsAlert = (errors) => {
    let errorsMsg = '<ul>';
    errors.map(({ msg }) => {
        errorsMsg += `<li>${msg}</li>`;
    });
    errorsMsg += '</ul>'
    Swal.fire({
        icon: 'error',
        title: "Errores de Validación",
        html: errorsMsg
    });
}