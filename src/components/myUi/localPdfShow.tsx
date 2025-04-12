import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// Import worker path manually
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function LocalPdfShow({ fileURL }: { fileURL: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await getDocument(fileURL).promise;
        const page = await pdf.getPage(1);
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d");
          const viewport = page.getViewport({ scale: 0.8 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: context!, viewport }).promise;
          setLoaded(true);
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };
    loadPdf();
  }, [fileURL]);

  return (
    <div className="relative w-40 h-60 bg-gray-300 rounded-md shadow-lg overflow-hidden flex items-center justify-center">
      {loaded ? (
        <canvas ref={canvasRef} className="w-full h-auto" />
      ) : (
        <span className="text-gray-500">Loading...</span>
      )}
    </div>
  );
}

export default LocalPdfShow;
