import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/admin.css'
import "./styles/mobile.css"
import App from './App.tsx'
import "qweather-icons/font/qweather-icons.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()
//"!"非空断言操作符,告诉 TypeScript 编译器：“相信我，这个元素一定存在，不会为 null，请把它当作 HTMLElement 类型处理
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
)
