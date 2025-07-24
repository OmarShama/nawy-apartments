import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function ImageUploader({ onFiles }: { onFiles: (files: File[]) => void }) {
    const [previews, setPreviews] = useState<string[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const validFiles = acceptedFiles.filter(file =>
            ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
        );
        setPreviews(validFiles.map(file => URL.createObjectURL(file)));
        onFiles(validFiles);
    }, [onFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png']
        },
        multiple: true,
    });

    return (
        <div {...getRootProps()} className="border-2 border-dashed p-4 text-center cursor-pointer mb-4">
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop images here...</p>
            ) : (
                <p>Drag & drop images or click to browse (JPEG, JPG, PNG)</p>
            )}
            <div className="flex gap-2 mt-4 flex-wrap">
                {previews.map((src, index) => (
                    <img key={index} src={src} alt="Preview" className="h-20 rounded" />
                ))}
            </div>
        </div>
    );
}
