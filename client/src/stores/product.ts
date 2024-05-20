import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useProductStore = defineStore("product", () => {
    const API_BASE_URL = "http://localhost:7777";
    const favorites = ref([]);
    const history = ref([]);

    const fetchProductData = async (param) => {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${param}.json`);
        const data = response.data.product;

        const productInfos = {
            img: data.image_url,
            marque: data.brands,
            vegan: data.ingredients_analysis,
            name: data.product_name,
            allergens: data.allergens,
            ingredients: data.ingredients_text_debug,
            palmOil: data.ingredients_from_palm_oil_n,
            carbone: data.carbon_footprint_percent_of_known_ingredient_debug,
            nutriScore: data.nutriscore_grade,
        };
        return productInfos;
        // productFound.push({ ...productInfos });
        // addToHistory({ ...productInfos });
        // console.log(productFound);
    };

    const addToFavorites = async (barcode) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/favorites/add`, { barcode });
            if (result.status === 201) {
                console.log("produit ajouté aux fav");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllFavorites = async () => {
        try {
            const result = await axios.get(`${API_BASE_URL}/favorites/getAll`);
            console.log(result.data);
            const barcodes = result.data;
            for (let i = 0; i < barcodes.length; i++) {
                const infos = await fetchProductData(barcodes[i]);
                favorites.value.push(infos);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addToHistory = async (barcode) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/history/add`, { barcode });
            if (result.status === 201) {
                console.log("Produit ajouté à l'historique.");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return { favorites, history, fetchProductData, addToFavorites, fetchAllFavorites, addToHistory };
});
