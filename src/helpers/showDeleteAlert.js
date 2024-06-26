import Swal from 'sweetalert2';
export const showDeleteAlert = (storeAction, id) => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No se podrá revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            storeAction(id);
        }
    }
    );
}