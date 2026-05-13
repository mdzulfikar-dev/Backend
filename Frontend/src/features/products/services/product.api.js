import axios from "axios";

const productApiInstance = axios.create({
    baseURL:"/api/products",
    withCredentials:true
})



export async function createProduct(formData){
    const response = await productApiInstance.post("/",formData) ;
    return response.data;
}


export async function getSellerProduct(){
    const response = await productApiInstance.get("/seller/getProducts");
    return response.data
}

export async function getAllProducts(){
    const response = await productApiInstance.get("getproducts")
    return response.data
}

export async function getProductById(productId){
    const response = await productApiInstance.get(`/detail/${productId}`)
    return response.data
}


export async function createProductVariant(
    productId,
    formData
){
    try {
         console.log(productId)
         console.log([...formData.entries()]);
        const response = await productApiInstance.post(`/detail/${productId}/variants`, formData)
        console.log(response)
        return response.data
        
    } catch (error) {
        
        console.log(error)
        throw error
        
    }
}