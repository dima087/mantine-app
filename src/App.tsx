import { useEffect, useState } from 'react';
import { AppShell, Container, Title } from '@mantine/core';
import { fetchProducts, type Product } from './api/products';
import { useCart } from './hooks/useCart';
import { AppHeader } from './components/AppHeader';
import { ProductList } from './components/ProductList';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { cartDetails, totalItems, totalPrice, addToCart, removeFromCart, updateCartQuantity } = useCart(products);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchProducts();
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppShell header={{ height: 60 }} padding={0}>
            <AppShell.Header withBorder>
                <AppHeader
                    totalItems={totalItems}
                    totalPrice={totalPrice}
                    onCartClick={() => setIsCartOpen(true)}
                />
            </AppShell.Header>

            <AppShell.Main bg="#f0f2f5">
                <Container size="xl" fluid mih="calc(100vh - 60px)" p="xl">
                    <Title order={2} mb="lg" ta="left" style={{ fontSize: 32, fontWeight: 700 }} c="dark">
                        Catalog
                    </Title>

                    <ProductList
                        products={products}
                        loading={loading}
                        error={error}
                        onRetry={loadProducts}
                        onAddToCart={addToCart}
                    />
                </Container>
            </AppShell.Main>

            <CartDrawer
                opened={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartDetails={cartDetails}
                totalPrice={totalPrice}
                onUpdateQuantity={updateCartQuantity}
                onRemove={removeFromCart}
            />
        </AppShell>
    );
}