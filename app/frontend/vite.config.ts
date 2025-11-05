// @ts-ignore
import react from '@vitejs/plugin-react';
import path from 'path';


//const isProd = process.env.NODE_ENV === 'production';

export default {
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    // Uncomment to enable HTTPS in production:
    // https: {
    //   key: fs.readFileSync('./certs/key.pem'),
    //   cert: fs.readFileSync('./certs/cert.pem'),
    // },
    allowedHosts: ["nomdedomainlocalvoulu.local"],
    proxy: {
      '/api': {
        target: 'http://nginx', // Redirige vers Nginx (qui envoie à backend:5000)
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@src': path.resolve(__dirname, 'src'),
      '@app/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  optimizeDeps: {
    include: ['@app/shared'],
  },
  test: {
    include: ['src/*.spec.ts', 'src/*.spec.tsx'],
    globals: true,
    environment: 'jsdom',
    css: true,
    //setupFiles: './vitest.setup.ts'
  },
};
