// import React, { useState, useRef } from 'react';
// import CanvasDraw from "react-canvas-draw";
// import './App.css';

// const App = () => {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [maskImage, setMaskImage] = useState(null);
//   const canvasRef = useRef(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setUploadedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleExportMask = () => {
//     const canvas = canvasRef.current.canvasContainer.children[1];
//     const mask = canvas.toDataURL();
//     setMaskImage(mask);
//   };

//   const handleClearCanvas = () => {
//     canvasRef.current.clear();
//   };

//   return (
//     <div className="app">
//       <h1>Image Inpainting Widget</h1>

//       {/* Image Upload Section */}
//       <div className="upload-section">
//         <input type="file" accept="image/*" onChange={handleImageUpload} />
//       </div>

//       {/* Canvas Section */}
//       {uploadedImage && (
//         <div className="canvas-container">
//           <img src={uploadedImage} alt="Uploaded" className="background-image" />
//           <CanvasDraw
//             ref={canvasRef}
//             brushRadius={5}
//             brushColor="white"
//             lazyRadius={2}
//           />
//           <div className="controls">
//             <button onClick={handleExportMask}>Save Mask</button>
//             <button onClick={handleClearCanvas}>Clear</button>
//           </div>
//         </div>
//       )}

//       {/* Display Section */}
//       {uploadedImage && maskImage && (
//         <div className="display-section">
//           <div>
//             <h3>Original Image</h3>
//             <img src={uploadedImage} alt="Original" className="display-image" />
//           </div>
//           <div>
//             <h3>Mask Image</h3>
//             <img src={maskImage} alt="Mask" className="display-image" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;



import React, { useState, useRef } from 'react';
import CanvasDraw from "react-canvas-draw";
import './App.css';

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportMask = () => {
    const canvas = canvasRef.current.canvasContainer.children[1];
    const mask = canvas.toDataURL();
    setMaskImage(mask);
  };

  const handleClearCanvas = () => {
    canvasRef.current.clear();
  };

  return (
    <div className="app">
      <h1>Image Inpainting Widget</h1>

      {/* Image Upload Section */}
      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {/* Canvas Section */}
      {uploadedImage && (
        <div className="canvas-container">
          <img src={uploadedImage} alt="Uploaded" className="background-image" />
          <CanvasDraw
            ref={canvasRef}
            brushRadius={5}
            brushColor="white"
            lazyRadius={2}
          />
          <div className="controls">
            <button onClick={handleExportMask}>Save Mask</button>
            <button onClick={handleClearCanvas}>Clear</button>
          </div>
        </div>
      )}

      {/* Display Section */}
      {uploadedImage && maskImage && (
        <div className="display-section">
          <div>
            <h3>Original Image</h3>
            <img src={uploadedImage} alt="Original" className="display-image" />
          </div>
          <div>
            <h3>Mask Image</h3>
            <img src={maskImage} alt="Mask" className="display-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
