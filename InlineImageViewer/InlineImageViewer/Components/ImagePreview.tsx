// src/components/ImagePreview.tsx

import * as React from 'react';
import { useState, CSSProperties } from 'react';
import { Stack, PrimaryButton, IconButton, Text } from '@fluentui/react';
import { Annotation } from '../types/Annotation';

interface ImagePreviewProps {
    annotation: Annotation;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ annotation }) => {
    const [zoom, setZoom] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);

    const handleZoomIn = () => setZoom((prev) => prev + 0.1);
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.1));
    const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

    const imageStyle: CSSProperties = {
        transform: `scale(${zoom}) rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease',
        maxWidth: '100%',
        maxHeight: '400px',
        display: 'block',
        margin: 'auto',
    };

    return (
        <Stack tokens={{ childrenGap: 10 }}>
            <Text variant="large">{annotation.fileName}</Text>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
                <PrimaryButton text="Zoom In" onClick={handleZoomIn} />
                <PrimaryButton text="Zoom Out" onClick={handleZoomOut} />
                <IconButton iconProps={{ iconName: 'Rotate' }} title="Rotate" onClick={handleRotate} />
            </Stack>
            <div style={{ textAlign: 'center' }}>
                <img
                    src={`data:${annotation.mimeType};base64,${annotation.documentBody}`}
                    alt={annotation.fileName}
                    style={imageStyle}
                />
            </div>
        </Stack>
    );
};

export default ImagePreview;
