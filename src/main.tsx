
import { createRoot } from 'react-dom/client'
import './index.css'
import rootRouter from "./routers/RootRouter.tsx";
import { RouterProvider } from "react-router-dom";
import { ModalProvider } from './providers/context/context.tsx';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

createRoot(document.getElementById('root')!).render(
  <ModalProvider>
     <RouterProvider router={rootRouter} />
  </ModalProvider>
 
)
