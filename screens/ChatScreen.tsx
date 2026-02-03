
import React, { useState, useRef, useEffect } from 'react';
import { Pet, Message } from '../types';
import { sendChatMessage } from '../api/chat';

interface ChatScreenProps {
  pet: Pet;
  onBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ pet, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `你好！我是领养中心的助手。很高兴你对 ${pet.name} 感兴趣。有什么我可以帮你的吗？` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      // 调用后端 AI 聊天 API
      const responseText = await sendChatMessage(pet.id, updatedMessages);
      setMessages([...updatedMessages, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error('聊天请求失败:', error);
      // 后端不可用时使用本地回退响应
      setMessages([...updatedMessages, {
        role: 'model',
        text: `抱歉，我现在无法回答您的问题。您可以直接点击"申请领养"按钮提交申请，或稍后再试。`
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-background-dark">
      <header className="sticky top-0 z-10 bg-white dark:bg-[#2d2418] border-b border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4">
        <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-3">
          <img src={pet.image} className="size-10 rounded-full object-cover border border-primary/20" alt={pet.name} />
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">{pet.name} 领养咨询</h3>
            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">AI 助手在线</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm font-medium text-sm leading-relaxed ${msg.role === 'user'
                ? 'bg-primary text-white rounded-tr-none'
                : 'bg-white dark:bg-[#332a1d] text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-800'
              }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#332a1d] px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-800 flex gap-1">
              <div className="size-1.5 rounded-full bg-gray-300 animate-bounce"></div>
              <div className="size-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:0.2s]"></div>
              <div className="size-1.5 rounded-full bg-gray-300 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </main>

      {/* FIXED WIDTH AND CENTERED */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white dark:bg-[#2d2418] border-t border-gray-100 dark:border-gray-800 flex gap-2 pb-8">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="向助手提问..."
          className="flex-1 h-12 rounded-xl bg-gray-50 dark:bg-gray-900 border-none ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-primary px-4 font-medium"
        />
        <button
          onClick={handleSend}
          className="size-12 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
