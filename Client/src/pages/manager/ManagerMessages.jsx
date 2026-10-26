import React, { useState } from 'react';
import { MessageSquare, Send, Search, Users, CheckCheck, Clock, Paperclip, MoreVertical, Shield, ArrowLeft } from 'lucide-react';

const mockConversations = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    lastMessage: 'I have updated the pull request with the requested changes.',
    time: '10:42 AM',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Raj Mehta',
    role: 'Backend Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    lastMessage: 'Will the sprint retro be moved to Thursday?',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Linda Cho',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    lastMessage: 'Figma prototypes for the leave dashboard are ready for review.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: 'Engineering Team Channel',
    role: 'Group • 8 members',
    isGroup: true,
    lastMessage: 'Alex: Reminder — daily standup at 10:00 AM.',
    time: 'Oct 25',
    unread: 0,
    online: true,
  },
];

const mockChatHistory = [
  { id: 1, sender: 'them', text: 'Hi Alex, quick update on the leave approval workflow.', time: '10:30 AM' },
  { id: 2, sender: 'them', text: 'I completed the unit tests for the attendance synchronization module.', time: '10:32 AM' },
  { id: 3, sender: 'me', text: 'Awesome work Sarah! Make sure to verify edge cases with weekend punch logs.', time: '10:38 AM' },
  { id: 4, sender: 'them', text: 'I have updated the pull request with the requested changes.', time: '10:42 AM' },
];

export default function ManagerMessages() {
  const [conversations] = useState(mockConversations);
  const [selectedChat, setSelectedChat] = useState(mockConversations[0]);
  const [chatMessages, setChatMessages] = useState(mockChatHistory);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setNewMessage('');
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-6 h-6 sm:w-7 h-7 text-violet-600" />
          Team Messages & Communication
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Direct messaging, department announcements, and 1-on-1 check-ins with team members.
        </p>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] sm:min-h-[620px]">
        {/* Sidebar: Conversation List */}
        <div className={`md:col-span-5 lg:col-span-4 border-r border-slate-100 flex flex-col bg-slate-50/50 ${
          mobileChatOpen ? 'hidden md:flex' : 'flex'
        }`}>
          <div className="p-3 sm:p-4 border-b border-slate-100 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-100 rounded-xl border border-transparent focus:bg-white focus:border-violet-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100/80">
            {filteredConversations.map((c) => {
              const active = selectedChat.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedChat(c);
                    setMobileChatOpen(true);
                  }}
                  className={`w-full text-left p-3.5 sm:p-4 flex items-start gap-3 transition-colors ${
                    active ? 'bg-violet-50/80 border-r-2 border-violet-600' : 'hover:bg-slate-100/60'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    {c.avatar ? (
                      <img src={c.avatar} alt={c.name} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-white" />
                    ) : (
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm">
                        <Users className="w-5 h-5" />
                      </div>
                    )}
                    {c.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{c.name}</h4>
                      <span className="text-[10px] sm:text-[11px] text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{c.lastMessage}</p>
                  </div>

                  {c.unread > 0 && (
                    <span className="w-5 h-5 bg-violet-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-1">
                      {c.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`md:col-span-7 lg:col-span-8 flex flex-col bg-white ${
          mobileChatOpen ? 'flex' : 'hidden md:flex'
        }`}>
          {/* Chat Header */}
          <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Mobile Back Button */}
              <button
                onClick={() => setMobileChatOpen(false)}
                className="md:hidden p-1.5 -ml-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Back to conversations"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="relative">
                {selectedChat.avatar ? (
                  <img src={selectedChat.avatar} alt={selectedChat.name} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm">
                    <Users className="w-4 h-4" />
                  </div>
                )}
                {selectedChat.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{selectedChat.name}</h3>
                <p className="text-[11px] sm:text-xs text-emerald-600 font-medium">
                  {selectedChat.online ? 'Active now' : 'Offline'} • {selectedChat.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 text-slate-400">
              <button className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Shield className="w-4 h-4 text-slate-500" />
              </button>
              <button className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto space-y-3 sm:space-y-4 bg-slate-50/40">
            {chatMessages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-violet-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-[11px] text-slate-400 px-1">
                    <span>{m.time}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-violet-600" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSend} className="p-2.5 sm:p-3 border-t border-slate-100 bg-white flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder={`Message ${selectedChat.name}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-slate-100 rounded-xl border border-transparent focus:bg-white focus:border-violet-500 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-3.5 sm:px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-sm transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
