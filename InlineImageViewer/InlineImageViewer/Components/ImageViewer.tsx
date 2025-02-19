/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ImageViewer.tsx

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Stack, Text } from '@fluentui/react';
import { Annotation } from '../types/Annotation';
import ThumbnailList from './ThumbnailList';
import ImagePreview from './ImagePreview';

export interface ImageViewerProps {
    recordId: string;
    webAPI: ComponentFramework.WebApi;
}

//const ImageViewer: React.FC<ImageViewerProps> = ({ recordId, webAPI }) =>

export default function ImageViewer(props: ImageViewerProps)
{
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [selectedImage, setSelectedImage] = useState<Annotation | null>(null);

    useEffect(() => {
        const fetchAnnotations = async () => {
            const fetchXML = `
        <fetch>
          <entity name="annotation">
            <attribute name="annotationid" />
            <attribute name="filename" />
            <attribute name="documentbody" />
            <attribute name="mimetype" />
            <filter>
              <condition attribute="objectid" operator="eq" value="${props.recordId}" />
              <condition attribute="isdocument" operator="eq" value="1" />
            </filter>
          </entity>
        </fetch>
      `;

            try {
                const result = await props.webAPI.retrieveMultipleRecords('annotation', `?fetchXml=${encodeURIComponent(fetchXML)}`);
                const records = result.entities.map((entity: any) => ({
                    id: entity.annotationid,
                    fileName: entity.filename,
                    documentBody: entity.documentbody,
                    mimeType: entity.mimetype,
                }));
                setAnnotations(records);
                if (records.length > 0) setSelectedImage(records[0]);
            } catch (error) {
                console.error('Error fetching annotations:', error);
            }
        };

        fetchAnnotations();
    }, [props.recordId, props.webAPI]);

    return (
        <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 10 } }}>
            <Text variant="xLarge">Image Viewer</Text>
            <ThumbnailList
                annotations={annotations}
                selectedImageId={selectedImage?.id || null}
                onSelectImage={setSelectedImage}
            />
            {selectedImage ? (
                <ImagePreview annotation={selectedImage} />
            ) : (
                <Text>No image selected</Text>
            )}
        </Stack>
    );
};

//export default ImageViewer;
