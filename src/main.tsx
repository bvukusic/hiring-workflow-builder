import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'reactflow/dist/style.css';
import Providers from '@/Providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>,
)
