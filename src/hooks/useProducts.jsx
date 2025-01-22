import { useEffect, useState } from 'react';
import { getProducts } from '../api/api';

const useProducts = (brand = null) => {
    const [products, setProducts] = useState([]);
    const [blurProducts, setBlurProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const fetchedProducts = await getProducts(brand);
                const availableProducts = fetchedProducts.filter((product) => product.quantity > 0);
                const outOfStockProducts = fetchedProducts.filter((product) => product.quantity === 0);

                setProducts(availableProducts);
                setBlurProducts(outOfStockProducts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [brand]);

    return { products, blurProducts, loading, error };
};

export default useProducts;
