"use client"
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Calendar, DollarSign, Clock, User, CreditCard, AlertCircle, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface PaymentData {
    summary: {
        totalSpent: number;
        totalSessions: number;
        totalHours: number;
    };
    payments: {
        id: string;
        bookingId: string;
        transactionId: string;
        amount: number;
        currency: string;
        paymentStatus: string;
        description: string;
        date: string;
        expert: {
            name: string;
            image?: string;
        };
    }[];
    sessions: {
        id: string;
        expertName: string;
        expertImage?: string;
        date: string;
        duration: number;
        durationUnit: string;
        status: string;
        amount: number;
    }[];
}

export default function PaymentsPage() {
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const user = session?.user;

    useEffect(() => {
        const fetchPayments = async () => {
            if (!user?.id) return;
            
            try {
                const response = await axios.get(`/api/payments?userId=${user.id}`);
                setPaymentData(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [user?.id]);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            completed: { variant: "default" as const, className: "bg-green-600 hover:bg-green-700" },
            confirmed: { variant: "default" as const, className: "bg-blue-600 hover:bg-blue-700" },
            pending: { variant: "outline" as const, className: "border-yellow-500 text-yellow-500" },
            cancelled: { variant: "outline" as const, className: "border-red-500 text-red-500" }
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        return (
            <Badge variant={config.variant} className={config.className}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                                <CardContent className="p-6">
                                    <div className="animate-pulse">
                                        <div className="h-4 bg-gray-700 rounded mb-2" />
                                        <div className="h-8 bg-gray-600 rounded" />
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
                <div>
                    <h1 className="text-3xl font-bold mb-2">Payments & Sessions</h1>
                    <p className="text-gray-400">Track your payments and session history</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mr-4">
                                    <DollarSign className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Total Spent</p>
                                    <p className="text-2xl font-bold text-purple-400">
                                        {paymentData?.summary.totalSpent.toFixed(2) || '0.00'} SOL
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mr-4">
                                    <Calendar className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Total Sessions</p>
                                    <p className="text-2xl font-bold text-blue-400">
                                        {paymentData?.summary.totalSessions || 0}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mr-4">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Total Hours</p>
                                    <p className="text-2xl font-bold text-purple-400">
                                        {paymentData?.summary.totalHours.toFixed(1) || '0.0'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs for Sessions and Payments */}
                <Tabs defaultValue="sessions" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-purple-500/20">
                        <TabsTrigger value="sessions" className="data-[state=active]:bg-purple-900/30">
                            <Calendar className="h-4 w-4 mr-2" />
                            Past Sessions
                        </TabsTrigger>
                        <TabsTrigger value="payments" className="data-[state=active]:bg-purple-900/30">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Payment History
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="sessions" className="space-y-4">
                        <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                            <CardHeader>
                                <CardTitle>Session History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {paymentData?.sessions && paymentData.sessions.length > 0 ? (
                                    <div className="space-y-4">
                                        {paymentData.sessions.map((session) => {
                                            const sessionDate = parseISO(session.date);
                                            const duration = session.durationUnit === 'hours' 
                                                ? `${session.duration} hr${session.duration > 1 ? 's' : ''}` 
                                                : `${session.duration} min`;

                                            return (
                                                <div
                                                    key={session.id}
                                                    className="flex items-center justify-between p-4 rounded-lg border border-purple-500/20 bg-purple-900/10 hover:bg-purple-900/20 transition-colors"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={session.expertImage || "/placeholder.svg"}
                                                            alt={session.expertName}
                                                            className="w-12 h-12 rounded-full object-cover border border-purple-500/30"
                                                        />
                                                        <div>
                                                            <h3 className="font-semibold">{session.expertName}</h3>
                                                            <p className="text-sm text-gray-400">
                                                                {format(sessionDate, 'MMM dd, yyyy • h:mm a')}
                                                            </p>
                                                            <p className="text-sm text-gray-500">{duration}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right space-y-2">
                                                        {getStatusBadge(session.status)}
                                                        <p className="text-sm font-medium text-purple-400">
                                                            {session.amount.toFixed(2)} SOL
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                        <h3 className="text-lg font-medium mb-2">No sessions yet</h3>
                                        <p className="text-gray-400">Your completed sessions will appear here.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="payments" className="space-y-4">
                        <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                            <CardHeader>
                                <CardTitle>Transaction History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {paymentData?.payments && paymentData.payments.length > 0 ? (
                                    <div className="space-y-4">
                                        {paymentData.payments.map((payment) => {
                                            const paymentDate = parseISO(payment.date);

                                            return (
                                                <div
                                                    key={payment.id}
                                                    className="flex items-center justify-between p-4 rounded-lg border border-purple-500/20 bg-purple-900/10 hover:bg-purple-900/20 transition-colors"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
                                                            <CreditCard className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold">{payment.description}</h3>
                                                            <p className="text-sm text-gray-400">
                                                                {format(paymentDate, 'MMM dd, yyyy • h:mm a')}
                                                            </p>
                                                            <div className="flex items-center mt-1">
                                                                <span className="text-xs text-gray-500 mr-2">TX:</span>
                                                                <span className="text-xs font-mono text-gray-400">
                                                                    {payment.transactionId.substring(0, 8)}...
                                                                </span>
                                                                <ExternalLink className="h-3 w-3 ml-1 text-gray-500" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right space-y-2">
                                                        {getStatusBadge(payment.paymentStatus)}
                                                        <p className="text-lg font-semibold text-green-400">
                                                            {payment.amount.toFixed(2)} {payment.currency}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                        <h3 className="text-lg font-medium mb-2">No payments yet</h3>
                                        <p className="text-gray-400">Your payment history will appear here.</p>
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

const getUserIdFromSession = () => {
    // Implement this function to get the user ID from the session
    // This is just a placeholder implementation
    return 'user-id-placeholder';
};
