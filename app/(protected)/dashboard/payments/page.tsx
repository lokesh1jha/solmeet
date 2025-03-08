import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import React from 'react';

const PaymentsPage: React.FC = () => {
    const payments = [
        { id: 1, amount: 100, status: 'paid' },
        { id: 2, amount: 200, status: 'pending' },
        { id: 3, amount: 150, status: 'paid' },
        { id: 4, amount: 250, status: 'pending' },
    ];

    return (
        <DashboardLayout>
        <div>
            <h1>Payments</h1>
            <h2>Paid Payments</h2>
            <ul>
                {payments.filter(payment => payment.status === 'paid').map(payment => (
                    <li key={payment.id}>Payment ID: {payment.id}, Amount: ${payment.amount}</li>
                ))}
            </ul>
            <h2>Pending Payments</h2>
            <ul>
                {payments.filter(payment => payment.status === 'pending').map(payment => (
                    <li key={payment.id}>Payment ID: {payment.id}, Amount: ${payment.amount}</li>
                ))}
            </ul>
        </div>
        </DashboardLayout>
    );
};

export default PaymentsPage;