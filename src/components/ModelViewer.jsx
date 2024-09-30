// components/ModelViewer.jsx
import React, { useEffect } from 'react';

const ModelViewer = ({
  src,
  alt,
  autoRotate = false,
  cameraControls = true,
  style = { width: '100%', height: '100%' },
}) => {
  useEffect(() => {
    // Dynamically import '@google/model-viewer' only on the client side
    import('@google/model-viewer');
  }, []);

  return (
    <model-viewer
      src={src}
      alt={alt}
      style={style}
      exposure="3"
      auto-rotate={autoRotate ? '' : undefined}
      camera-controls={cameraControls ? '' : undefined}
      ar
    ></model-viewer>
  );
};

export default ModelViewer;
