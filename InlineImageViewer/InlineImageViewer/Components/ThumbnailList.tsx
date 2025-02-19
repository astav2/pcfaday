// src/components/ThumbnailList.tsx

import * as React from 'react';
import { Stack } from '@fluentui/react';
import { Annotation } from '../types/Annotation';

interface ThumbnailListProps {
    annotations: Annotation[];
    selectedImageId: string | null;
    onSelectImage: (annotation: Annotation) => void;
}

const ThumbnailList: React.FC<ThumbnailListProps> = ({ annotations, selectedImageId, onSelectImage }) => {
    return (
        <Stack horizontal tokens={{ childrenGap: 10 }}>
            {annotations.map((annotation) => (
                <img
                    key={annotation.id}
                    src={`data:${annotation.mimeType};base64,${annotation.documentBody}`}
                    alt={annotation.fileName}
                    style={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        border: selectedImageId === annotation.id ? '2px solid #0078d4' : '1px solid #ccc',
                        cursor: 'pointer',
                    }}
                    onClick={() => onSelectImage(annotation)}
                />
            ))}
        </Stack>
    );
};

export default ThumbnailList;
