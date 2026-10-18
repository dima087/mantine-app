export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
}

export async function fetchProducts(): Promise<Product[]> {
    const url = 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}