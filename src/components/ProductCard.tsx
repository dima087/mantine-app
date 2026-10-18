import { useState } from 'react';
import { Card, Box, Image, Text, Group, ActionIcon, Button } from '@mantine/core';
import { IconShoppingCart, IconPlus, IconMinus } from '@tabler/icons-react';
import type { Product } from '../api/products';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, qty: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        if (quantity > 0) {
            onAddToCart(product, quantity);
            setQuantity(1);
        }
    };

    return (
        <Card
            shadow="sm"
            radius={16}
            p={0}
            w="100%"
            style={{
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            withBorder
        >
            <Box p="md" pb={0}>
                <Image src={product.image} h={220} w="100%" alt={product.name} fit="contain" radius={8} />
            </Box>

            <Box px="md" pt="md">
                <Group justify="space-between" align="flex-start">
                    <Box>
                        <Text fw={700} size="lg" style={{ fontSize: 18 }} c="dark">
                            {product.name.replace("- 1 Kg", "")}
                        </Text>
                        <Text size="sm" c="dimmed">1 kg</Text>
                    </Box>

                    <Group gap={4} align="center">
                        <ActionIcon
                            size={32}
                            radius={8}
                            variant="filled"
                            bg="#e9ecef"
                            c="#495057"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            <IconMinus size={16} stroke={2} />
                        </ActionIcon>
                        <Text fw={600} size="sm" w={24} ta="center" c="dark">{quantity}</Text>
                        <ActionIcon
                            size={32}
                            radius={8}
                            variant="filled"
                            bg="#e9ecef"
                            c="#495057"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            <IconPlus size={16} stroke={2} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Box>

            <Box px="md" pb="md" pt="xs">
                <Group justify="space-between" align="center" gap="xs">
                    <Text fw={700} size="xl" style={{ fontSize: 20 }} c="green.7">
                        $ {product.price}
                    </Text>
                    <Button
                        variant="filled"
                        color="green.7"
                        radius={8}
                        rightSection={<IconShoppingCart size={16} />}
                        onClick={handleAddToCart}
                        style={{ flex: 1, fontWeight: 600, fontSize: 14, height: 40 }}
                    >
                        Add to cart
                    </Button>
                </Group>
            </Box>
        </Card>
    );
}