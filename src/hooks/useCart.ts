import { useState, useMemo } from 'react';
import type { Product } from '../api/products';

export function useCart(products: Product[]) {
    const [cart, setCart] = useState<Record<string, number>>({});

    const addToCart = (product: Product, quantity: number) => {
        if (quantity <= 0) return;
        const key = String(product.id);
        setCart((prev) => ({
            ...prev,
            [key]: (prev[key] || 0) + quantity,
        }));
    };

    const removeFromCart = (productId: string | number) => {
        const key = String(productId);
        setCart((prev) => {
            const newCart = { ...prev };
            delete newCart[key];
            return newCart;
        });
    };

    const updateCartQuantity = (productId: string | number, quantity: number) => {
        const key = String(productId);
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart((prev) => ({ ...prev, [key]: quantity }));
        }
    };

    const cartDetails = useMemo(() => {
        return Object.entries(cart)
            .map(([id, qty]) => {
                const product = products.find((p) => String(p.id) === id);
                return product ? { product, qty } : null;
            })
            .filter(Boolean) as { product: Product; qty: number }[];
    }, [cart, products]);

    const totalItems = useMemo(() => cartDetails.reduce((sum, item) => sum + item.qty, 0), [cartDetails]);

    const totalPrice = useMemo(() =>
            cartDetails.reduce((sum, item) => sum + item.product.price * item.qty, 0),
        [cartDetails]);

    return {
        cart,
        cartDetails,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateCartQuantity,
    };
}