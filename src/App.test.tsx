import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

import App from './App';
import { fetchProducts } from './api/products';

vi.mock('./api/products', () => {
    return {
        fetchProducts: vi.fn(),
    };
});

function renderWithMantine(ui: React.ReactElement) {
    return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('App Component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('должен отображать индикатор загрузки при первоначальной загрузке', async () => {
        vi.mocked(fetchProducts).mockImplementation(
            () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
        );

        renderWithMantine(<App />);

        expect(screen.getByText(/Загружаем товары с сервера/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText(/Загружаем товары с сервера/i)).not.toBeInTheDocument();
        });
    });

    it('должен отображать ошибку и кнопку повтора при сбое загрузки', async () => {
        vi.mocked(fetchProducts).mockRejectedValue(new Error('Network Error'));

        renderWithMantine(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Ошибка загрузки/i)).toBeInTheDocument();
            expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Попробовать снова/i })).toBeInTheDocument();
        });
    });

    it('должен корректно рендерить список товаров', async () => {
        // TypeScript сам понимает, что внутри должен быть Product[],
        // поэтому явный тип не нужен.
        vi.mocked(fetchProducts).mockResolvedValue([
            { id: 1, name: 'Apple - 1 Kg', price: 2.5, image: 'apple.jpg', category: 'Fruits' },
        ]);

        renderWithMantine(<App />);

        await waitFor(() => {
            expect(screen.getByText('Apple')).toBeInTheDocument();
            expect(screen.getByText('$ 2.5')).toBeInTheDocument();
        });
    });

    it('должен добавлять товар в корзину, обновлять шапку и отображать данные в popup (Drawer)', async () => {
        vi.mocked(fetchProducts).mockResolvedValue([
            { id: 1, name: 'Apple - 1 Kg', price: 2.5, image: 'apple.jpg', category: 'Fruits' },
        ]);

        renderWithMantine(<App />);

        await waitFor(() => {
            expect(screen.getByText('Apple')).toBeInTheDocument();
        });

        expect(screen.getByText('$0.00')).toBeInTheDocument();

        const quantityText = screen.getByText('1');
        const quantityGroup = quantityText.parentElement!;
        const buttonsInGroup = quantityGroup.querySelectorAll('button');

        const incrementButton = buttonsInGroup[1] as HTMLButtonElement;

        await user.click(incrementButton);

        await waitFor(() => {
            expect(screen.getAllByText('2').length).toBeGreaterThan(0);
        });

        const addToCartBtn = screen.getByRole('button', { name: /Add to cart/i });
        await user.click(addToCartBtn);

        await waitFor(() => {
            expect(screen.getByText('$5.00')).toBeInTheDocument();
        });

        const cartTrigger = screen.getByText('Корзина').closest('div') as HTMLElement;
        await user.click(cartTrigger);

        await waitFor(() => {
            expect(screen.getByText('Ваша корзина')).toBeInTheDocument();
            expect(screen.getByText('Apple')).toBeInTheDocument();
            expect(screen.getByText('$2.5 x 2 кг')).toBeInTheDocument();
            expect(screen.getByText('$5.00')).toBeInTheDocument();
        });

        const drawerQuantityText = screen.getByText('2');
        const drawerQuantityGroup = drawerQuantityText.parentElement!;
        const drawerButtons = drawerQuantityGroup.querySelectorAll('button');
        const decrementButton = drawerButtons[0] as HTMLButtonElement;

        await user.click(decrementButton); // станет 1
        await user.click(decrementButton); // станет 0, должно удалиться

        await waitFor(() => {
            expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
            expect(screen.getByText('$0.00')).toBeInTheDocument();
        });
    });
});