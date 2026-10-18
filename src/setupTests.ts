import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.spyOn(console, 'warn').mockImplementation((...args) => {
    if (args[0]?.includes?.('MantineProvider')) return;
    console.warn(...args);
});