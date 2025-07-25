import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';
import Image from 'next/image';

export function ImageUploader({
    files,
    onFiles,
    onRemove
}: {
    files: File[];
    onFiles: (files: File[]) => void;
    onRemove: (index: number) => void;
}) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const validFiles = acceptedFiles.filter(file =>
                ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
            );
            onFiles(validFiles); // send new files to parent
        },
        [onFiles]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
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
            <div className="flex flex-wrap gap-2 mt-4">
                {files.map((file, index) => (
                    <div key={index} className="relative w-20 h-20 group">
                        <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="object-cover rounded"
                            fill
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(index);
                            }}
                            className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full text-red-600 text-xs w-5 h-5 flex items-center justify-center group-hover:scale-110 transition"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
