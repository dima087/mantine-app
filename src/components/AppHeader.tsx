import { Group, Text, Box } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';

interface AppHeaderProps {
    totalItems: number;
    totalPrice: number;
    onCartClick: () => void;
}

export function AppHeader({ totalItems, totalPrice, onCartClick }: AppHeaderProps) {
    return (
        <Group h="100%" px="md" justify="space-between">
            <Group gap="xs">
                <Text fw={700} size="xl" c="dark">Vegetable</Text>
                <Box
                    w={80}
                    h={33}
                    bg="green.7"
                    style={{ borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text c="white" fw={600} size="xl">SHOP</Text>
                </Box>
            </Group>

            <Group
                gap="sm"
                style={{ cursor: 'pointer', padding: '8px', borderRadius: '8px' }}
                onClick={onCartClick}
            >
                <Box style={{ position: 'relative' }}>
                    <IconShoppingCart size={28} stroke={1.5} color="#2e7d32" />
                    {totalItems > 0 && (
                        <Box
                            style={{
                                position: 'absolute',
                                top: -6,
                                right: -6,
                                backgroundColor: '#2e7d32',
                                color: 'white',
                                borderRadius: '50%',
                                width: 20,
                                height: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 12,
                                fontWeight: 700,
                            }}
                        >
                            {totalItems}
                        </Box>
                    )}
                </Box>
                <Box>
                    <Text size="xs" c="dimmed" lh={1}>Корзина</Text>
                    <Text fw={700} size="sm" lh={1} c="dark">${totalPrice.toFixed(2)}</Text>
                </Box>
            </Group>
        </Group>
    );
}