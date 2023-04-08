import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Loan Wise (loanwi.se)',
        short_name: 'Loan Wise',
        description: 'Loan and repayment calculator tool. Calculate the repayment amount per week or month for any loan.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon-16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: 'favicon-32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'favicon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'favicon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon.svg',
            sizes: '48x48 72x72 96x96 128x128 256x256 512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'maskable_icon.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
