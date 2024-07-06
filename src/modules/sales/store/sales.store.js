import { defineStore } from "pinia";

export const useSaleStore = defineStore('sale', () => {


    const getSale = async (id) => {
        // setLoading(true);
        // const responseGetOrder = await getDataApi(`${pathUrlModule}/${id}`, {}, 'GET');
        // const { icon: iconResponse, errors, msg, data } = await responseGetOrder.json();

        // if (errors && errors.length > 0) {
        //     setLoading(false);
        //     showErrorsAlert(iconResponse, router, 'Error de Búsqueda', errors, 'list-order');
        //     return;
        // }
        // console.log(data);
        // setOrder(data);
        // showErrorsAlert(iconResponse, null, msg, [], '', true);
        // setLoading(false);
    };

    return {
        getSale
    }
});