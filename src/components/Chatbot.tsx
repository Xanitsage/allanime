// src/components/Chatbot.tsx
'use client';

import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  async function sendMessage() {
    setMessages(msgs => [...msgs, { role: 'user', content: input }]);
    setInput('');
    // Call your API route for AI response here
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'demo', watchHistory: [input] }),
    });
    const data = await res.json();
    setMessages(msgs => [...msgs, { role: 'assistant', content: data.recommendations }]);
  }

  return (
    <div className="fixed bottom-24 right-8 bg-gray-900 rounded-lg shadow-xl p-4 w-80 z-50">
      <div className="h-40 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={msg.role === 'user' ? 'text-neon' : 'text-blue-400'}>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded px-2 py-1 bg-gray-800 text-white"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask for anime help..."
        />
        <button
          className="bg-neon px-3 py-1 rounded text-white font-bold"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
