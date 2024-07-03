// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import getPdfsById from "../utils/getPdfsById";
// import DocViewer, { PDFRenderer } from "@cyntler/react-doc-viewer";
// import { CircularProgress, Grid, Typography, Card, CardContent, ButtonBase, CardActions } from "@mui/material";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import 'react-pdf/dist/Page/AnnotationLayer.css';

// const PdfFiles = ({ moduleId, isStudent }) => {
//     const [pdfs, setPdfs] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectedPdf, setSelectedPdf] = useState(null);
//     const [pdfLoading, setPdfLoading] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const data = await getPdfsById(moduleId);
//                 setPdfs(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [moduleId]);

//     const handlePdfClick = async (pdf) => {
//         try {
//             setPdfLoading(true);
//             const response = await axios.get(`http://localhost:8000/api/pdfs/download/${pdf.id}`, {
//                 responseType: "blob",
//             });

//             const pdfBlob = new Blob([response.data], { type: "application/pdf" });
//             const url = URL.createObjectURL(pdfBlob);

//             setSelectedPdf([{ uri: url, fileName: pdf.title }]);
//             setPdfLoading(false);
//         } catch (error) {
//             console.error("Error downloading PDF:", error);
//             setPdfLoading(false);
//         }
//     };

//     return (
//         <div>
//             {loading && <CircularProgress />}
//             {!loading && pdfs && pdfs.length > 0 && (
//                 <Grid container spacing={2}>
//                     {pdfs.map((pdf, index) => (
//                         <Grid item key={index} xs={12} sm={6} md={4} lg={3}>

//                             {!isStudent && (
//                                 <div
//                                     style={{ width: "100%", height: "100%", display: "block", textDecoration: "none" }}

//                                 >
//                                     <Card elevation={3} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
//                                         <CardContent style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
//                                             <InsertDriveFileIcon style={{ fontSize: 60, color: "#6a5bcd", alignSelf: "center" }} />
//                                             <Typography variant="subtitle1" style={{ marginTop: "10px", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                                 {pdf.title}
//                                             </Typography>
//                                             <Typography variant="body2" style={{ textAlign: "center" }}>
//                                                 {pdf.fileName}
//                                             </Typography>
//                                         </CardContent>
//                                         <CardActions onClick={() => handlePdfClick(pdf)}>View</CardActions>
//                                     </Card>
//                                 </div>
//                             )}
//                             {isStudent && (
//                                 <ButtonBase
//                                     style={{ width: "100%", height: "100%", display: "block", textDecoration: "none" }}
//                                     onClick={() => handlePdfClick(pdf)}
//                                 >
//                                     <Card elevation={3} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
//                                         <CardContent style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
//                                             <InsertDriveFileIcon style={{ fontSize: 60, color: "#6a5bcd", alignSelf: "center" }} />
//                                             <Typography variant="subtitle1" style={{ marginTop: "10px", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                                 {pdf.title}
//                                             </Typography>
//                                             <Typography variant="body2" style={{ textAlign: "center" }}>
//                                                 {pdf.fileName}
//                                             </Typography>
//                                         </CardContent>
//                                     </Card>
//                                 </ButtonBase>
//                             )}
//                         </Grid>
//                     ))}
//                 </Grid>

//             )}
//             {pdfLoading && <CircularProgress />}
//             {selectedPdf && !pdfLoading && (
//                 <DocViewer
//                     documents={selectedPdf}
//                     pluginRenderers={[PDFRenderer]}
//                     theme={{
//                         primary: "#cac1ff",
//                         secondary: "cyan",
//                         tertiary: "#cac1ff",
//                         textPrimary: "black",
//                         textSecondary: "#5296d8",
//                         textTertiary: "#00000099",
//                         viewer: {
//                             borderRadius: 10,
//                         },
//                         disableThemeScrollbar: false,
//                     }}
//                     className="p-5"
//                 />
//             )}
//         </div>
//     );
// };

// export default PdfFiles;





// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import getPdfsById from "../utils/getPdfsById";
// // import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// // import "@cyntler/react-doc-viewer/dist/index.css";

// // const PdfFiles = ({ moduleId }) => {
// //   const [pdfs, setPdfs] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [selectedPdf, setSelectedPdf] = useState(null);
// //   const [pdfLoading, setPdfLoading] = useState(false);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await getPdfsById(moduleId);
// //         setPdfs(data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [moduleId]);

// //   const handlePdfClick = async (pdfId) => {
// //     try {
// //       setPdfLoading(true);
// //       const response = await axios.get(`http://localhost:8000/api/pdfs/download/${pdfId}`, {
// //         responseType: "blob", // Important for downloading files
// //       });

// //       const pdfBlob = new Blob([response.data], { type: "application/pdf" });
// //       const url = URL.createObjectURL(pdfBlob);

// //       setSelectedPdf(url);
// //       setPdfLoading(false);
// //     } catch (error) {
// //       console.error("Error downloading PDF:", error);
// //       setPdfLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       {loading && <p>Loading...</p>}
// //       {!loading && pdfs && pdfs.length > 0 && (
// //         <div>
// //           {pdfs.map((pdf, index) => (
// //             <div key={index}>
// //               <h3>{pdf.title}</h3>
// //               <button onClick={() => handlePdfClick(pdf.id)}>View PDF</button>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //       {pdfLoading && <p>Loading PDF...</p>}
// //       {selectedPdf && !pdfLoading && (
// //         <DocViewer documents={selectedPdf} pluginRenderers={DocViewerRenderers} />
// //         // <div style={{ display: "flex", flexDirection: "column", height: "750px" }}>
// //         //   <object data={selectedPdf} type="application/pdf" style={{ width: "100%", height: "100%" }}>
// //         //     <p>An error occurred. Your PDF viewer may not support displaying PDFs.</p>
// //         //   </object>
// //         // </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PdfFiles;