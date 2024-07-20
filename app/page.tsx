'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import FileUploadDropzone from "@/components/ui/fileuploaderdropzone"
import { Input } from "@/components/ui/input"
import { ClearCurrentContext } from "@/components/misc/button_functions"
import { useState } from "react";
import  Link  from "next/link";

export default function Home() {
  const [API_KEY, setAPI] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
        <p className="fixed flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          AI File Upload&nbsp;
        
        </p>
      </div>
        <FileUploadDropzone>
          
        </FileUploadDropzone>

        <div>
          <Button variant="destructive" onClick={() => {
            window.location.href = "/chat";
            }} >Continue</Button>
        </div>
        
    </main>
  );
}

