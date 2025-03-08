"use client"
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Calendar, DollarSignIcon } from 'lucide-react';


export default function PaymentsPage() {
    interface Payment {
        id: string;
        bookingId: string;
        transactionId: string;
        date: string;
        amount: number;
    }

    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const user = session?.user;


    const paymentRecords = {
        earnedAmount: "3.01 SOL",
        noOfMeetings: 5
    }
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const userId: string = user.id; // Implement this function to get user ID from session
                const response = await axios.get<Payment[]>(`/api/payments?userId=${userId}`);
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-black text-white">
                <main className="container mx-auto px-4 py-12">
                    {/* <h1 className="text-3xl font-bold mb-8">Your Profile</h1> */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                            <CardHeader>
                                <CardTitle>Payments Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {paymentRecords ? (
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex items-center">
                                            <DollarSignIcon className="h-5 w-5 mr-2 text-purple-400" />
                                            <span>Earned : {paymentRecords.earnedAmount}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                                            <span>Meetings: {paymentRecords.noOfMeetings} SOL</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center h-full">
                                        <svg className="animate-spin h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                    </div>
                                )}
                            </CardContent>
                        </Card>


                    </div>

                    <Tabs defaultValue="sessions" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="sessions">Past Sessions</TabsTrigger>
                            <TabsTrigger value="payments">Payment History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="sessions">
                            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                                <CardHeader>
                                    <CardTitle>Past Sessions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {/* {pastSessions.map((session) => (
                                            <div
                                            key={session.id}
                                            className="flex items-center justify-between border-b border-purple-500/20 pb-4"
                                            >
                                            <div>
                                                <h3 className="font-semibold">{session.expert}</h3>
                                                <p className="text-sm text-gray-400">{session.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p>{session.duration}</p>
                                                <p className="text-sm text-purple-400">{session.price} SOL</p>
                                            </div>
                                            </div>
                                        ))} */}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="payments">
                            <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
                                <CardHeader>
                                    <CardTitle>Payment History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {/* {payments.map((payment) => (
                                            <div
                                            key={payment.id}
                                            className="flex items-center justify-between border-b border-purple-500/20 pb-4"
                                            >
                                            <div>
                                                <h3 className="font-semibold">{payment.description}</h3>
                                                <p className="text-sm text-gray-400">{payment.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-purple-400">{payment.amount} SOL</p>
                                            </div>
                                            </div>
                                        ))} */}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </DashboardLayout>
    );
};

const getUserIdFromSession = () => {
    // Implement this function to get the user ID from the session
    // This is just a placeholder implementation
    return 'user-id-placeholder';
};
