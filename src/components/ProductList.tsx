import { Box, Text, SimpleGrid, Loader, Alert, Button } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import type { Product } from '../api/products';
import { ProductCard } from './ProductCard';

interface ProductListProps {
    products: Product[];
    loading: boolean;
    error: string | null;
    onRetry: () => void;
    onAddToCart: (product: Product, qty: number) => void;
}

export function ProductList({ products, loading, error, onRetry, onAddToCart }: ProductListProps) {
    if (loading) {
        return (
            <Box ta="center" py="xl">
                <Loader size="lg" color="green" />
                <Text mt="md" c="dimmed">Загружаем товары с сервера...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Alert icon={<IconAlertCircle size={16} />} title="Ошибка загрузки" color="red" variant="filled" mt="md">
                {error}
                <Button variant="white" color="red" mt="sm" onClick={onRetry}>
                    Попробовать снова
                </Button>
            </Alert>
        );
    }

    if (products.length === 0) {
        return <Text c="dimmed" ta="center" mt="xl">Товары отсутствуют</Text>;
    }

    return (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={20} verticalSpacing={20}>
            {products.map((product) => (
                <ProductCard key={String(product.id)} product={product} onAddToCart={onAddToCart} />
            ))}
        </SimpleGrid>
    );
}