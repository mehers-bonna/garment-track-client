import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './providers/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
  </StrictMode>
)
