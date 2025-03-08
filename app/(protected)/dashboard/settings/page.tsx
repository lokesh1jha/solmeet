"use client"
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
    const [role, setRole] = useState<'user' | 'expert'>('user');

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value as 'user' | 'expert');
    };

    const handleDeleteAccount = () => {
        // Add your delete account logic here
        alert('Account deleted');
    };

    return (
        <DashboardLayout>
        <div>
            <h1>Settings</h1>
            <div>
                <label htmlFor="role">Switch Role:</label>
                <select id="role" value={role} onChange={handleRoleChange}>
                    <option value="user">User</option>
                    <option value="expert">Expert</option>
                </select>
            </div>
            <div>
                <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
        </div>
        </DashboardLayout>
    );
};

export default SettingsPage;