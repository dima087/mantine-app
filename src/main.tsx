import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';

// 1. Сначала стили Mantine
import '@mantine/core/styles.css';
// 2. Потом свои стили — чтобы они могли переопределять Mantine
import './index.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="auto">
            <App />
        </MantineProvider>
    </StrictMode>,
);