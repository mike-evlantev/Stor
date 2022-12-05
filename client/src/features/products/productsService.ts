import axios from "axios";

const API_URL = "/api/products/";

// Get all products
const getProducts = async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
  
    const { data } = await axios.get(API_URL, config);

    return data;
}

// Get product by id
const getProduct = async (id: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
  
    const { data } = await axios.get(API_URL + id, config);
    console.log(data);
    return data;
}

export const productsService = { getProducts, getProduct };