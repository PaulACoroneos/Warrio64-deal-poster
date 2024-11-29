'use client'
import { useEffect, useState } from 'react';
import { AtpAgent } from '@atproto/api';
import LoginDialog from './components/login-dialog';

const agent = new AtpAgent({ service: "https://bsky.social" });

export default function Home() {
  const [text, setText] = useState(''); 
  const isLoggedIn = Boolean(agent.session?.active);
  const [isOpen,setIsOpen] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>, text: string) {
    event.preventDefault();
    agent.post({ text });
    setText('')
  }

  useEffect(() => {
      setIsOpen(!isLoggedIn);
  },[isLoggedIn])
  return (
    <div className="min-h-screen w-full">
      <main className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-white pb-2">Wario64 Deal Poster</h1>
      <LoginDialog agent={agent} open={isOpen} onClose={() => setIsOpen(false)} />
                <form onSubmit={(event) => handleSubmit(event, text)} className="flex flex-col gap-4 pb-4">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="border p-2 w-full h-32 text-black"
                  placeholder="Enter deal post"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Submit
                </button>
                </form>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
              Hacked together by Paul Coroneos
            </footer>
          </div>
  );
}
