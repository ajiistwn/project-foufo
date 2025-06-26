// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finance',
        href: '/finance',
    },
];

const budgetData = {
    totalBudget: 9933000000,
    gross: 1485462859,
    totalIncome: 4720000000,
    totalExpenses: 3234537141,
    percentage: '32.56%',
    updatedDate: '12/6/25'
  };

  const expenses = [
    { label: 'Development', budget: 150000000, spent: 67532500 },
    { label: 'Crew', budget: 2700000000, spent: 1234345095 },
    { label: 'Cast', budget: 825000000, spent: 245692245 },
    { label: 'Equipment', budget: 1355000000, spent: 136946150 },
    { label: 'Art', budget: 650000000, spent: 592500000 },
    { label: 'Transportation', budget: 1000000000, spent: 238904500 },
    { label: 'Accomodation', budget: 312000000, spent: 207984633 },
    { label: 'Meal', budget: 386000000, spent: 206499600 },
    { label: 'Production', budget: 1350000000, spent: 0 },
    { label: 'Post Production', budget: 350000000, spent: 0 },
    { label: 'CGI & VFX', budget: 615000000, spent: 0 },
    { label: 'Scoring & Mixing', budget: 240000000, spent: 0 }
];

const formatNumber = (num: number) => {
    if (typeof num !== 'number') return '0';
    return num.toLocaleString('id-ID');
  };

export default function Finance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Finance"/>
            <div className="min-h-screen  p-6">
                <div className=" w-full mb-3">
                    <h1 className="text-2xl font-bold">Budget & Expense</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                    <Card className="">
                    <CardContent className="">
                        <p className="text-sm ">Total Budget</p>
                        <h2 className="text-2xl font-semibold">{formatNumber(budgetData.totalBudget)}</h2>
                        <p className="text-xs ">*after Handing Fee & Tax</p>
                    </CardContent>
                    </Card>
                    <Card className="">
                    <CardContent className="">
                        <p className="text-sm ">Gross</p>
                        <h2 className="text-2xl font-semibold">{formatNumber(budgetData.gross)}</h2>
                        <p className="text-xs ">Gross financial calculation</p>
                    </CardContent>
                    </Card>
                    <Card className="">
                    <CardContent className="">
                        <p className="text-sm ">Total Income</p>
                        <h2 className="text-2xl font-semibold">{formatNumber(budgetData.totalIncome)}</h2>
                        <p className="text-xs ">*Project financial input</p>
                    </CardContent>
                    </Card>
                    <Card className="">
                    <CardContent className="">
                        <p className="text-sm ">Total Expenses</p>
                        <h2 className="text-2xl font-semibold">{formatNumber(budgetData.totalExpenses)}</h2>
                        <p className="text-xs ">{budgetData.percentage}</p>
                    </CardContent>
                    </Card>
                </div>

                <div className="mt-10">
                    <h1 className="text-2xl font-bold">Expenses Tracker</h1>
                    <p className="text-sm text-zinc-600 mb-4">Update Finance Data: {budgetData.updatedDate}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {expenses.map(({ label, budget, spent }) => (
                        <div key={label}>
                        <h3 className="text-l font-medium">{label}</h3>
                        <p className="text-xs text-zinc-600">Budget: {formatNumber(budget)}</p>
                        <p className="text-sm font-semibold">{formatNumber(spent)}</p>
                        <Progress className="h-2 [&>div]:bg-pink-500" value={(spent / budget) * 100}    />
                        </div>
                    ))}
                    </div>
                </div>
            </div>

        </AppLayout>
    );
}
