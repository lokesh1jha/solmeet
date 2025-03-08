"use client"
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

const Messages = () => {
    const users = [
        { id: 1, name: 'John Doe', image: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Jane Smith', image: 'https://via.placeholder.com/50' },
    ];

    const messages = [
        { id: 1, userId: 1, text: 'Hello, how are you?' },
        { id: 2, userId: 2, text: 'I am good, thank you!' },
    ];

    return (
        <DashboardLayout>
            <div className="flex">
                <div className="w-1/4 p-4 border-r border-gray-200">
                    {users.map(user => (
                        <div key={user.id} className="flex items-center mb-4">
                            <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
                            <span className="text-lg font-medium">{user.name}</span>
                        </div>
                    ))}
                </div>
                <div className="w-3/4 p-4">
                    {messages.map(message => (
                        <div key={message.id} className="mb-4">
                            <span className="text-base">{message.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Messages;
