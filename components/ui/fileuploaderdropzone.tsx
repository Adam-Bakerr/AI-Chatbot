"use client";
 
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/uploader";
import Image from "next/image";
import { useState } from "react";
import { useCallback } from "react";
import { DropzoneOptions } from "react-dropzone";
import { useDropzone } from 'react-dropzone';
import { promises as fs } from 'fs';
import { SaveCurrentContext } from "@/components/misc/button_functions"

//Read The Contents Of Any Given File
export function parse(file: File){
  // Always return a Promise
  return new Promise<string>((ressolve, reject) => {
    let content = '';
    const reader = new FileReader();
    // Wait till complete
    reader.onloadend = function(e: any) {
    content = e.target.result;
      ressolve(e.target.result);
    };
    // Make sure to handle error states
    reader.onerror = function(e: any) {
      reject(e);
    };
    reader.readAsText(file);
  });
}

const FileUploadDropzone = () => {
    const [files, setFiles] = useState<File[] | null>([]);

    const onDrop = useCallback((acceptedFiles: File[] | null) => {
    acceptedFiles?.forEach((file) => {
        if(file != null){
             parse(file).then((output) => {SaveCurrentContext(output, file.name)});
        }
    });
  }, []);
 
  const dropzone = {
    accept: {
      "text/*": [".pdf", ".txt", ".docx"],
    },
    multiple: true,
    maxFiles: 4,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;
 
  return (
    <FileUploader
      value={files}
      onValueChange={onDrop}
      dropzoneOptions={dropzone}
      className="justify-center"
    >
      <FileInput>
        <div className="flex items-center justify-center h-32 w-[70vw] border bg-background rounded-md ">
          <p className="text-gray-400">Click Or Drop Files Here</p>
        </div>
      </FileInput>
      <FileUploaderContent className="flex items-center flex-row gap-2">
        {files?.map((file, i) => (
          <FileUploaderItem
            key={i}
            index={i}
            className="size-20 p-0 rounded-md overflow-hidden"
            aria-roledescription={`file ${i + 1} containing ${file.name}`}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              height={80}
              width={80}
              className="size-20 p-0"
            />
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};
 
export default FileUploadDropzone;