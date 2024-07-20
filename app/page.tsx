'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react";
import ChatWindow from "@/components/misc/chat_window";
import FileUploadDropzone from "@/components/ui/fileuploaderdropzone";
import { ClearCurrentContext } from "@/components/misc/button_functions";

export default function Chat() {

  window.onbeforeunload = ClearCurrentContext;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <FileUploadDropzone>
        </FileUploadDropzone>
        <ChatWindow />
    
    </main>
  );
}