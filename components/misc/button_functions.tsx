import type { NextApiRequest, NextApiResponse } from 'next';


export function SaveCurrentContext(dataToSave : string, filename : string){
    let currentContext : string[] = GetCurrentContext();
    console.log(dataToSave)
    currentContext.push(filename + "\n" + dataToSave);
    sessionStorage.setItem("CurrentContext",JSON.stringify(currentContext));
}

export function ClearCurrentContext(){
    sessionStorage.removeItem("CurrentContext");
}

export function GetCurrentContext() : string[]{
    let currentJson = sessionStorage.getItem("CurrentContext");
    if(currentJson != null){
        return JSON.parse(currentJson);
    }
    return [] as string[];
}

export function GetCurrentContextAsString() : string{
    let currentJson = sessionStorage.getItem("CurrentContext");

    let contextStrings : string[] = [];
    if(currentJson != null){
        contextStrings = JSON.parse(currentJson);
    }

    const numberedMessages = contextStrings.map((msg, index) => `File 1: ${index + 1}: ${msg}`);
    const conversation = numberedMessages.join('\n');
    return conversation;
}
