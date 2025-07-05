"use client"
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Calendar, Clock, Video, User, AlertCircle, Plus } from 'lucide-react';
import { format, parseISO, isPast, isFuture } from 'date-fns';
import Link from 'next/link';

interface Meeting {
    id: string;
    expert: {
        name: string;
        image?: string;
    };
    bookingDate: string;
    bookingDuration: number;
    durationUnit: string;
    status: string;
    priceAtBooking: number;
}

const MeetingsPage: React.FC = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const user = session?.user;

    useEffect(() => {
        const fetchMeetings = async () => {
            if (!user?.id) return;
            
            try {
                const response = await axios.get('/api/dashboard/meetings/all');
                setMeetings(response.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeetings();
    }, [user?.id]);

    const getStatusBadge = (status: string, date: string) => {
        const meetingDate = parseISO(date);
        const isUpcoming = isFuture(meetingDate);
        const isPastMeeting = isPast(meetingDate);
        
        let statusToShow = status;
        let config;
        
        if (isPastMeeting && status === 'confirmed') {
            statusToShow = 'completed';
        }
        
        const statusConfig = {
            completed: { variant: "default" as const, className: "bg-green-600 hover:bg-green-700" },
            confirmed: { variant: "default" as const, className: "bg-blue-600 hover:bg-blue-700" },
            pending: { variant: "outline" as const, className: "border-yellow-500 text-yellow-500" },
            cancelled: { variant: "outline" as const, className: "border-red-500 text-red-500" }
        };
        
        config = statusConfig[statusToShow as keyof typeof statusConfig] || statusConfig.pending;
        
        return (
            <Badge variant={config.variant} className={config.className}>
                {statusToShow.charAt(0).toUpperCase() + statusToShow.slice(1)}
            </Badge>
        );
    };

    const upcomingMeetings = meetings.filter(meeting => {
        const meetingDate = parseISO(meeting.bookingDate);
        return isFuture(meetingDate) && ['confirmed', 'pending'].includes(meeting.status);
    });

    const pastMeetings = meetings.filter(meeting => {
        const meetingDate = parseISO(meeting.bookingDate);
        return isPast(meetingDate) || meeting.status === 'cancelled';
    });

    const renderMeetingCard = (meeting: Meeting) => {
        const meetingDate = parseISO(meeting.bookingDate);
        const duration = meeting.durationUnit === 'hours' 
            ? `${meeting.bookingDuration} hr${meeting.bookingDuration > 1 ? 's' : ''}` 
            : `${meeting.bookingDuration} min`;
        const canJoin = isFuture(meetingDate) && meeting.status === 'confirmed';

        return (
            <div
                key={meeting.id}
                className="p-4 rounded-lg border border-purple-500/20 bg-purple-900/10 hover:bg-purple-900/20 transition-colors"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={meeting.expert.image || "/placeholder.svg"}
                            alt={meeting.expert.name}
                            className="w-12 h-12 rounded-full object-cover border border-purple-500/30"
                        />
                        <div>
                            <h3 className="font-semibold text-white">{meeting.expert.name}</h3>
                            <div className="flex items-center text-sm text-gray-400 mt-1">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="mr-3">{format(meetingDate, 'MMM dd, yyyy')}</span>
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{format(meetingDate, 'h:mm a')} ({duration})</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                {meeting.priceAtBooking.toFixed(2)} SOL
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        {getStatusBadge(meeting.status, meeting.bookingDate)}
                        {canJoin && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-500/30 hover:bg-blue-900/20 hover:border-blue-400/50"
                            >
                                <Video className="h-4 w-4 mr-2 text-blue-400" />
                                Join
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="p-6">
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                                <CardContent className="p-6">
                                    <div className="animate-pulse flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-700" />
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-700 rounded mb-2" />
                                            <div className="h-3 bg-gray-600 rounded w-2/3" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-6 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Meetings</h1>
                        <p className="text-gray-400">Manage your upcoming and past sessions</p>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <Link href="/experts">
                            <Plus className="h-4 w-4 mr-2" />
                            Book Session
                        </Link>
                    </Button>
                </div>

                <Tabs defaultValue="upcoming" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-purple-500/20">
                        <TabsTrigger value="upcoming" className="data-[state=active]:bg-purple-900/30">
                            <Calendar className="h-4 w-4 mr-2" />
                            Upcoming ({upcomingMeetings.length})
                        </TabsTrigger>
                        <TabsTrigger value="past" className="data-[state=active]:bg-purple-900/30">
                            <Clock className="h-4 w-4 mr-2" />
                            Past ({pastMeetings.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="space-y-4">
                        <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                            <CardHeader>
                                <CardTitle>Upcoming Sessions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {upcomingMeetings.length > 0 ? (
                                    <div className="space-y-4">
                                        {upcomingMeetings.map(renderMeetingCard)}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                        <h3 className="text-lg font-medium mb-2">No upcoming meetings</h3>
                                        <p className="text-gray-400 mb-4">You don't have any sessions scheduled.</p>
                                        <Button asChild variant="outline" className="border-purple-500/30 hover:bg-purple-900/20">
                                            <Link href="/experts">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Book a Session
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="past" className="space-y-4">
                        <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                            <CardHeader>
                                <CardTitle>Past Sessions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {pastMeetings.length > 0 ? (
                                    <div className="space-y-4">
                                        {pastMeetings.map(renderMeetingCard)}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                        <h3 className="text-lg font-medium mb-2">No past meetings</h3>
                                        <p className="text-gray-400">Your completed sessions will appear here.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default MeetingsPage;