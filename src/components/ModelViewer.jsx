// components/ModelViewer.jsx
import React, { useEffect } from 'react';

const ModelViewer = ({
  src,
  alt,
  autoRotate = false,
  cameraControls = true,
  interactionPrompt = "none",
  rotationPerSecond = "15deg",
  autoRotateDelay = "0",
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
      exposure="6"
      interaction-prompt = {interactionPrompt}
      rotation-per-second = {rotationPerSecond}
      auto-rotate={autoRotate ? '' : undefined}
      auto-rotate-delay = {autoRotateDelay}
      camera-controls={cameraControls ? '' : undefined}
      ar
    ></model-viewer>
  );
};

export default ModelViewer;
