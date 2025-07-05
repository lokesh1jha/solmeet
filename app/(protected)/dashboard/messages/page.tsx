"use client"
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Search, Phone, Video, MoreVertical, AlertCircle } from 'lucide-react';

interface User {
    id: number;
    name: string;
    image: string;
    lastMessage: string;
    timestamp: string;
    unread: number;
    isOnline: boolean;
}

interface Message {
    id: number;
    userId: number;
    text: string;
    timestamp: string;
    isOwn: boolean;
}

const Messages = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - in a real app, this would come from an API
    const users: User[] = [
        {
            id: 1,
            name: 'Alex Rivera',
            image: '/placeholder.svg',
            lastMessage: 'Thanks for the great session on smart contracts!',
            timestamp: '2 min ago',
            unread: 2,
            isOnline: true
        },
        {
            id: 2,
            name: 'Sophia Chen',
            image: '/placeholder.svg',
            lastMessage: 'Looking forward to our DeFi discussion tomorrow',
            timestamp: '1 hour ago',
            unread: 0,
            isOnline: false
        },
        {
            id: 3,
            name: 'Marcus Johnson',
            image: '/placeholder.svg',
            lastMessage: 'The NFT marketplace architecture was really helpful',
            timestamp: '1 day ago',
            unread: 1,
            isOnline: true
        }
    ];

    const messages: Message[] = selectedUser ? [
        {
            id: 1,
            userId: selectedUser.id,
            text: 'Hey! Ready for our session today?',
            timestamp: '10:30 AM',
            isOwn: false
        },
        {
            id: 2,
            userId: 0,
            text: 'Yes, looking forward to it! I have some questions about smart contract optimization.',
            timestamp: '10:32 AM',
            isOwn: true
        },
        {
            id: 3,
            userId: selectedUser.id,
            text: 'Perfect! I\'ve prepared some examples and we can go through them step by step.',
            timestamp: '10:35 AM',
            isOwn: false
        },
        {
            id: 4,
            userId: 0,
            text: 'That sounds great. See you at 2 PM!',
            timestamp: '10:40 AM',
            isOwn: true
        }
    ] : [];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // In a real app, you would send this to your backend
            console.log('Sending message:', newMessage);
            setNewMessage('');
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Messages</h1>
                    <p className="text-gray-400">Chat with experts and students</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
                    {/* Users List */}
                    <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center">
                                <MessageSquare className="h-5 w-5 mr-2" />
                                Conversations
                            </CardTitle>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search conversations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-black/60 border-purple-500/20 focus:border-purple-400"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[500px]">
                                {filteredUsers.length > 0 ? (
                                    <div className="space-y-2 p-4">
                                        {filteredUsers.map(user => (
                                            <div
                                                key={user.id}
                                                onClick={() => setSelectedUser(user)}
                                                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                                                    selectedUser?.id === user.id
                                                        ? 'bg-purple-900/30 border border-purple-500/30'
                                                        : 'hover:bg-purple-900/20'
                                                }`}
                                            >
                                                <div className="relative">
                                                    <img
                                                        src={user.image}
                                                        alt={user.name}
                                                        className="w-12 h-12 rounded-full object-cover border border-purple-500/30"
                                                    />
                                                    {user.isOnline && (
                                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                                                    )}
                                                </div>
                                                <div className="ml-3 flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium truncate">{user.name}</p>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-xs text-gray-400">{user.timestamp}</span>
                                                            {user.unread > 0 && (
                                                                <Badge className="bg-blue-600 text-white px-1.5 py-0.5 text-xs">
                                                                    {user.unread}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-400 truncate">{user.lastMessage}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 px-4">
                                        <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                        <h3 className="text-lg font-medium mb-2">No conversations</h3>
                                        <p className="text-gray-400 text-sm">Start chatting with experts after booking sessions.</p>
                                    </div>
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Chat Area */}
                    <div className="lg:col-span-2">
                        {selectedUser ? (
                            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 h-full flex flex-col">
                                {/* Chat Header */}
                                <CardHeader className="border-b border-purple-500/20">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="relative">
                                                <img
                                                    src={selectedUser.image}
                                                    alt={selectedUser.name}
                                                    className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
                                                />
                                                {selectedUser.isOnline && (
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="font-semibold">{selectedUser.name}</h3>
                                                <p className="text-sm text-gray-400">
                                                    {selectedUser.isOnline ? 'Online' : 'Offline'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                                <Phone className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                                <Video className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                {/* Messages */}
                                <CardContent className="flex-1 p-0">
                                    <ScrollArea className="h-[400px] p-4">
                                        <div className="space-y-4">
                                            {messages.map(message => (
                                                <div
                                                    key={message.id}
                                                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                                            message.isOwn
                                                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                                                : 'bg-gray-800 text-gray-200'
                                                        }`}
                                                    >
                                                        <p className="text-sm">{message.text}</p>
                                                        <p className={`text-xs mt-1 ${
                                                            message.isOwn ? 'text-purple-200' : 'text-gray-400'
                                                        }`}>
                                                            {message.timestamp}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>

                                {/* Message Input */}
                                <div className="p-4 border-t border-purple-500/20">
                                    <div className="flex space-x-2">
                                        <Input
                                            placeholder="Type a message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className="flex-1 bg-black/60 border-purple-500/20 focus:border-purple-400"
                                        />
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!newMessage.trim()}
                                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ) : (
                            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 h-full flex items-center justify-center">
                                <div className="text-center">
                                    <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                                    <p className="text-gray-400">Choose a conversation from the sidebar to start chatting.</p>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Messages;
