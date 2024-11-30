import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Send, 
  Image, 
  Paperclip,
  Phone,
  Video,
  AlertCircle,
  Clock,
  CheckCheck,
  Filter
} from 'lucide-react';

const ChatDashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, customers, cleaners, support

  // Sample data
  const chats = [
    {
      id: 1,
      type: 'booking',
      customer: {
        name: 'Sarah Johnson',
        image: null,
        unread: 2
      },
      cleaner: {
        name: 'Maria Garcia',
        image: null
      },
      bookingId: 'BK-2024001',
      lastMessage: {
        text: "I'll be there in 10 minutes",
        timestamp: '10:30 AM',
        sender: 'cleaner'
      },
      status: 'active'
    },
    {
      id: 2,
      type: 'support',
      user: {
        name: 'Mike Smith',
        image: null,
        type: 'customer'
      },
      issue: 'Billing Question',
      priority: 'medium',
      lastMessage: {
        text: "I have a question about my last invoice",
        timestamp: '9:45 AM',
        sender: 'customer'
      },
      status: 'open'
    }
  ];

  const messages = [
    {
      id: 1,
      text: "Hi, I'm on my way to your location",
      sender: 'cleaner',
      timestamp: '10:25 AM',
      status: 'read'
    },
    {
      id: 2,
      text: "Great, the door code is 1234",
      sender: 'customer',
      timestamp: '10:27 AM',
      status: 'read'
    },
    {
      id: 3,
      text: "I'll be there in 10 minutes",
      sender: 'cleaner',
      timestamp: '10:30 AM',
      status: 'delivered'
    }
  ];

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    // Add message handling logic here
    setMessageInput('');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Messages</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Chat Filters */}
          <div className="flex gap-2 mt-4">
            {['all', 'customers', 'cleaners', 'support'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === f 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                selectedChat?.id === chat.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-medium">
                    {chat.type === 'booking' 
                      ? `${chat.customer.name} ↔ ${chat.cleaner.name}`
                      : chat.user.name
                    }
                  </h3>
                  <p className="text-sm text-gray-500">
                    {chat.type === 'booking' ? chat.bookingId : chat.issue}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {chat.lastMessage.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage.text}
              </p>
              {chat.customer?.unread && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-green-500 text-white rounded-full mt-1">
                  {chat.customer.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-medium">
                  {selectedChat.type === 'booking' 
                    ? `${selectedChat.customer.name} ↔ ${selectedChat.cleaner.name}`
                    : selectedChat.user.name
                  }
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedChat.type === 'booking' 
                    ? selectedChat.bookingId 
                    : selectedChat.issue
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Video className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'customer' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'customer'
                      ? 'bg-gray-100'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  <p>{message.text}</p>
                  <div className={`flex items-center justify-end mt-1 space-x-1 ${
                    message.sender === 'customer' ? 'text-gray-500' : 'text-green-200'
                  }`}>
                    <span className="text-xs">{message.timestamp}</span>
                    {message.sender !== 'customer' && getStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <form onSubmit={sendMessage} className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Paperclip className="w-5 h-5 text-gray-500" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Image className="w-5 h-5 text-gray-500" />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                type="submit"
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        // No Chat Selected State
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No chat selected</h3>
            <p className="text-gray-500 mt-1">
              Choose a conversation from the list
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDashboard;
