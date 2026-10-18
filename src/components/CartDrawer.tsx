import { Drawer, Text, ScrollArea, Group, Box, Image, ActionIcon, Divider, Button } from '@mantine/core';
import { IconShoppingCart, IconPlus, IconMinus, IconTrash } from '@tabler/icons-react';
import type { Product } from '../api/products';

interface CartDrawerProps {
    opened: boolean;
    onClose: () => void;
    cartDetails: { product: Product; qty: number }[];
    totalPrice: number;
    onUpdateQuantity: (productId: string | number, qty: number) => void;
    onRemove: (productId: string | number) => void;
}

export function CartDrawer({ opened, onClose, cartDetails, totalPrice, onUpdateQuantity, onRemove }: CartDrawerProps) {
    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            title={<Text fw={700} size="xl">Ваша корзина</Text>}
            position="right"
            size="md"
            padding="xl"
        >
            {cartDetails.length === 0 ? (
                <Box ta="center" py="xl">
                    <IconShoppingCart size={48} color="#adb5bd" stroke={1} />
                    <Text mt="md" c="dimmed" size="lg">Корзина пуста</Text>
                    <Button variant="light" color="green.7" mt="md" onClick={onClose}>
                        Перейти к покупкам
                    </Button>
                </Box>
            ) : (
                <>
                    <ScrollArea h="calc(100vh - 300px)" offsetScrollbars>
                        {cartDetails.map(({ product, qty }) => (
                            <Group key={String(product.id)} justify="space-between" mb="md" p="md" bg="gray.0" style={{ borderRadius: 12 }}>
                                <Group gap="sm">
                                    <Image
                                        src={product.image}
                                        h={60}
                                        w={60}
                                        fit="contain"
                                        style={{ borderRadius: 8, backgroundColor: 'white' }}
                                    />
                                    <Box>
                                        <Text fw={600} size="sm">{product.name.replace("- 1 Kg", "")}</Text>
                                        <Text size="xs" c="dimmed">${product.price} x {qty} кг</Text>
                                        <Group gap={4} mt={4}>
                                            <ActionIcon size={24} radius={6} variant="subtle" color="gray" onClick={() => onUpdateQuantity(product.id, qty - 1)}>
                                                <IconMinus size={14} />
                                            </ActionIcon>
                                            <Text size="xs" fw={600} w={20} ta="center">{qty}</Text>
                                            <ActionIcon size={24} radius={6} variant="subtle" color="gray" onClick={() => onUpdateQuantity(product.id, qty + 1)}>
                                                <IconPlus size={14} />
                                            </ActionIcon>
                                        </Group>
                                    </Box>
                                </Group>

                                <Group gap="xs">
                                    <Text fw={700} size="sm">${(product.price * qty).toFixed(2)}</Text>
                                    <ActionIcon color="red" variant="subtle" onClick={() => onRemove(product.id)} title="Удалить товар">
                                        <IconTrash size={18} />
                                    </ActionIcon>
                                </Group>
                            </Group>
                        ))}
                    </ScrollArea>

                    <Divider my="md" />

                    <Box>
                        <Group justify="space-between" mb="md">
                            <Text fw={700} size="lg" c="dark">Итого:</Text>
                            <Text fw={700} size="xl" c="green.7">${totalPrice.toFixed(2)}</Text>
                        </Group>
                        <Button fullWidth size="md" color="green.7" radius="md">
                            Оформить заказ
                        </Button>
                    </Box>
                </>
            )}
        </Drawer>
    );
}