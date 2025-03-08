"use client"
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import React, { useState } from 'react';

const MeetingsPage: React.FC = () => {
    const [filter, setFilter] = useState('upcoming');

    const meetings = [
        { id: 1, title: 'Meeting 1', status: 'upcoming' },
        { id: 2, title: 'Meeting 2', status: 'canceled' },
        { id: 3, title: 'Meeting 3', status: 'completed' },
        { id: 4, title: 'Meeting 4', status: 'upcoming' },
    ];

    const filteredMeetings = meetings.filter(meeting => meeting.status === filter);

    return (
        <DashboardLayout>
        <div>
            <h1>Meetings</h1>
            <div>
                <button onClick={() => setFilter('upcoming')}>Upcoming</button>
                <button onClick={() => setFilter('canceled')}>Canceled</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMeetings.map(meeting => (
                        <tr key={meeting.id}>
                            <td>{meeting.id}</td>
                            <td>{meeting.title}</td>
                            <td>{meeting.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </DashboardLayout>
    );
};

export default MeetingsPage;