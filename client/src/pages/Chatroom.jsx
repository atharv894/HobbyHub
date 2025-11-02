import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';
import axios from 'axios';

const Chatroom = () => {
  const { hobby } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchMessages();

    const socketURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const newSocket = io(socketURL, {
      withCredentials: true
    });

    newSocket.on('connect', () => {
      newSocket.emit('join-room', hobby);
    });

    newSocket.on('receive-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit('leave-room', hobby);
      newSocket.disconnect();
    };
  }, [hobby]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/chat/${encodeURIComponent(hobby)}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user) return;

    socket.emit('send-message', {
      content: newMessage,
      sender: user._id || user.id,
      hobby: hobby
    });

    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/chatrooms')}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Chatrooms
        </button>

        <div className="bg-white rounded-lg shadow-md">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h1 className="text-2xl font-bold">{hobby} Chatroom</h1>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((message) => {
                const senderId = message.sender?._id || message.sender;
                const currentUserId = user?._id || user?.id;
                const isOwnMessage = senderId === currentUserId;
                
                return (
                <div
                  key={message._id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isOwnMessage
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="font-semibold text-sm">
                      {isOwnMessage ? 'You' : (message.sender?.name || 'Unknown')}
                    </p>
                    <p>{message.content}</p>
                    <p className="text-xs opacity-75 mt-1">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;

