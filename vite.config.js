import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@data': path.resolve(__dirname, './src/data'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@use \"src/styles/variables.scss\" as *; @use \"src/styles/mixins.scss\" as *;",
                silenceDeprecations: ['legacy-js-api'],
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
                    'animation-vendor': ['gsap'],
                },
            },
        },
    },
    assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr'],
});
