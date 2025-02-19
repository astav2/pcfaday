// src/types/Annotation.ts

export interface Annotation {
    id: string;
    fileName: string;
    documentBody: string; // base64-encoded image data
    mimeType: string;
}
