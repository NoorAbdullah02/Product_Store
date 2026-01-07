import api from './axios.js';

export const loginUser = async (userData) => {
    try {
        const response = await api.post('/users/login', userData);
        console.log("Login successful");
        return response.data;
    } catch (error) {
        console.error('Error Login:', error);
        throw error; // Re-throw so component can catch it
    }
}


export const RegisterUser = async (userData) => {
    try {
        const response = await api.post('/users/register', userData);
        console.log("Registration successful");
        return response.data;
    } catch (error) {
        console.error('Error Register:', error);
        throw error; // Re-throw so component can catch it
    }
}

// product apis

export const getAllProducts = async () => {
    try {

        //user apis
        const { response } = await api.get('/products');
        return response;


    } catch (error) {
        console.error('Error syncing user data:', error);
    }
}


export const getProductById = async (id) => {
    try {

        //user apis
        const { response } = await api.get(`/products/${id}`);
        return response;
    } catch (error) {
        console.error('Error syncing user data:', error);
    }
}

export const getMyProducts = async () => {
    try {

        //user apis
        const { response } = await api.get(`/products/my`);
        return response;
    } catch (error) {
        console.error('Error syncing user data:', error);
    }
}


export const createProduct = async (productData) => {
    try {

        //user apis
        const { response } = await api.post('/products', productData);
        return response;
    } catch (error) {
        console.error('Error syncing user data:', error);
    }
}


export const UpdateProduct = async (id) => {
    try {

        //user apis
        const { response } = await api.put(`/products/${id}`);
        return response;
    } catch (error) {
        console.error('Error syncing user data:', error);
    }
}

export const DeleteProduct = async (id) => {
    try {

        //user apis
        const { response } = await api.delete(`/products/${id}`);
        return response;
    } catch (error) {
        console.error('Error syncing user data:', error);
    }
}


export const CreateComment = async (productId, content) => {

    try {
        const { response } = await api.post(`/comments/${productId}`, { content });
        return response;
    }
    catch (error) {
        console.error('Error creating comment:', error);
    }
}


export const deleteComment = async (commentId) => {
    try {

        //user apis
        const { response } = await api.delete(`/comments/${commentId}`);
        return response;
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}

