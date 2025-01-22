

const API_URL = "https://luminisapi.onrender.com/api";

export const saveOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/save-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Грешка при запазване на поръчката. Моля, пробвайте пак!");
        }
        return result;
    } catch (error) {
        console.error("❌ Error submitting order:", error);
        throw error;
    }
};

export const fetchEcontOffices = async () => {
    try {
      const response = await fetch(`${API_URL}/get-offices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
  
      if (data?.success && data.offices) {
        return data.offices;
      } else {
        console.error("❌ No offices found:", data);
        return [];
      }
    } catch (error) {
      console.error("❌ Error fetching Econt offices:", error);
      alert("Грешка при зареждането на офисите на Еконт.");
      return [];
    }
  };
  
// Fetch product details by ID
export const getProductById = async (id) => {
  try {
      const response = await fetch(`${API_URL}/products/${id}`);
      const result = await response.json();

      if (!response.ok) {
          throw new Error(result.message || "Грешка при зареждане на продукта.");
      }
      return result.product;
  } catch (error) {
      console.error("❌ Error fetching product details:", error);
      throw error;
  }
};

// Fetch all products or filter by brand
export const getProducts = async (brand) => {
  try {
      const url = brand ? `${API_URL}/products?brand=${brand}` : `${API_URL}/products`;
      const response = await fetch(url);

      const result = await response.json();
      if (!response.ok) {
          throw new Error(result.message || "Грешка при зареждане на продуктите.");
      }
      return result.products;
  } catch (error) {
      console.error("❌ Error fetching products:", error);
      throw error;
  }
};