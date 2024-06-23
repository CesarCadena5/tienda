export const getDataApi = async (urlPath, data = {}, method = 'POST') => {
    try {
        const bodyData = method !== 'GET' ? JSON.stringify(data) : null;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: bodyData
        };
        const resp = await fetch(`${import.meta.env.VITE_API_URL}${urlPath}`, options);

        return resp;
    } catch (error) {
        throw new Error('Error al ejecutar la petición');
    }
};