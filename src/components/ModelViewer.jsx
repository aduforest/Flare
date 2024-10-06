// components/ModelViewer.jsx
import React, { useEffect } from 'react';

const ModelViewer = ({
  src,
  alt,
  autoRotate = false,
  cameraControls = true,
  rotationPerSecond = "15deg",
  style = { width: '100%', height: '100%' },
}) => {
  useEffect(() => {
    import('@google/model-viewer');
  }, []);

  return (
    <model-viewer
      src={src}
      alt={alt}
      style={style}
      exposure="3"
      rotation-per-second = {rotationPerSecond}
      auto-rotate={autoRotate ? '' : undefined}
      camera-controls={cameraControls ? '' : undefined}
      ar
    ></model-viewer>
  );
};

export default ModelViewer;
