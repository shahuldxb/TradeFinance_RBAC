import '@/components/keenicons/assets/styles.css';
import './styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import "./index.css"
import { App } from './App';
import { setupAxios } from './auth';
import React from 'react';
import { ProvidersWrapper } from './providers';
import { Toaster } from 'sonner';
/**
 * Inject interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios);
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProvidersWrapper> 
        <App />
      </ProvidersWrapper>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
