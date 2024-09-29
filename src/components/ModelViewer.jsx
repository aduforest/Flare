// components/ModelViewer.jsx
import React, { useEffect } from 'react';

const ModelViewer = ({ src, alt }) => {
  useEffect(() => {
    // Dynamically import '@google/model-viewer' only on the client side
    import('@google/model-viewer');
  }, []);

  return (
    <model-viewer
      src={src}
      alt={alt}
      style={{ width: '100%', height: '100%' }}
      exposure="5" // Increase exposure to make lighting brighter
      camera-controls
      auto-rotate
      ar
    ></model-viewer>
  );
};

export default ModelViewer;
