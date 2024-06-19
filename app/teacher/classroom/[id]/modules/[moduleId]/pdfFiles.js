import React, { useEffect, useState } from "react";
import axios from "axios";
import getPdfsById from "../utils/getPdfsById";

const PdfFiles = ({ moduleId }) => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPdfsById(moduleId);
        setPdfs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [moduleId]);

  const handlePdfClick = async (pdfId) => {
    try {
      setPdfLoading(true);
      const response = await axios.get(`http://localhost:8000/api/pdfs/download/${pdfId}`, {
        responseType: "blob", // Important for downloading files
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);

      setSelectedPdf(url);
      setPdfLoading(false);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setPdfLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && pdfs && pdfs.length > 0 && (
        <div>
          {pdfs.map((pdf, index) => (
            <div key={index}>
              <h3>{pdf.title}</h3>
              <button onClick={() => handlePdfClick(pdf.id)}>View PDF</button>
            </div>
          ))}
        </div>
      )}
      {pdfLoading && <p>Loading PDF...</p>}
      {selectedPdf && !pdfLoading && (
        <div style={{ display: "flex", flexDirection: "column", height: "750px" }}>
          <object data={selectedPdf} type="application/pdf" style={{ width: "100%", height: "100%" }}>
            <p>An error occurred. Your PDF viewer may not support displaying PDFs.</p>
          </object>
        </div>
      )}
    </div>
  );
};

export default PdfFiles;
