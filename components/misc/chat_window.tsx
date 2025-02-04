// components/ChatWindow.tsx
import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
import { GetCurrentContextAsString } from './button_functions';
import { Input } from "@/components/ui/input"
import { error } from 'console';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

let openai : OpenAI | null = null;
let chatHistory : OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
chatHistory.push({role: 'system', content: GetCurrentContextAsString()});


const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [APIKEY, setAPIKEY] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);


  const handleSend = () => {
      openai = new OpenAI({apiKey: APIKEY, dangerouslyAllowBrowser: true})
      chatHistory[0] = {role: 'system', content: GetCurrentContextAsString()};

    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input.trim(),
        sender: 'user',
      };

      
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      console.log(newMessage.id);
      getResponse(newMessage.text);
    }
  };

  async function getResponse(input : string) {

  chatHistory.push({ role: "system", content: input });
  console.log(chatHistory);
    if(openai != null){
      let completion;
      try{
          completion = await openai.chat.completions.create({
          messages: chatHistory,
          model: "gpt-4-turbo",
      });
      }catch(error){

        addBotMessage("Failed To Generate A Response,\n You may have an invalid API key")
        return
      }
      if(completion != undefined){
        let message = completion.choices[0].message.content;
        chatHistory.push(completion.choices[0].message);
        if(message)addBotMessage(message);
        else addBotMessage("Failed To Generate A Response")
      }

  }

}

  const addBotMessage = (messageText: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'bot',
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log(newMessage.id);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={styles.chatContainer}>
      <Input onChange={() => {}} placeholder={"Insert API Key"} value={APIKEY} onChangeCapture={(value) => setAPIKEY(value.currentTarget.value)}/>
      <div style={styles.chatBox}>
        {messages.map((message, idx) => (
          <div key={message.id} style={message.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {message.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button onClick={
            handleSend
            } style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    height: '80vh',
    width: '70vw',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto' as 'auto',
    padding: '10px',
  },
  userMessage: {
    margin: '5px 0',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    alignSelf: 'flex-end',
  },
  botMessage: {
    margin: '5px 0',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: 'none',
    outline: 'none',
  },
  button: {
    padding: '10px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default ChatWindow;
