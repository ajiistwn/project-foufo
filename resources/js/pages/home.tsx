// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
// import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import React from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/home',
    },
];

export default function Home() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <div className=" text-white min-h-screen">
                {/* Header Image */}
                <section className="mb-5 h-62" style={{ backgroundImage: `url('https://picsum.photos/seed/${Math.random()}/1200/400')` }}>

                </section>

                {/* Content Section */}
                <div className="container mx-auto lg:p-5">
                    {/* About Project */}
                    <Card className="mt-0 p-0 shadow-none border-none">
                        <CardHeader className='-mb-1'>
                            <h2 className="text-xl font-bold">About Project</h2>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-15">
                            {/* Title */}
                                <li className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-left font-semibold">Title</span>
                                    <span className='text-right'>Foufo</span>
                                </li>
                                {/* Format */}
                                <li className="flex items-center justify-between border-b border-gray-200 pb-2">
                                    <span className="text-left font-semibold">Format</span>
                                    <span className='text-right'>Film</span>
                                </li>
                                {/* Status */}
                                <li className="flex items-center justify-between  border-b border-gray-200 pb-2">
                                    <span className="text-left font-semibold">Status</span>
                                    <span className='text-right'>Production</span>
                                </li>
                                {/* Target */}
                                <li className="flex items-center justify-between  border-b border-gray-200 pb-2">
                                    <span className="text-left font-semibold">Target</span>
                                    <span className='text-right' >Production: 31 May 2025</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Synopsis */}
                    <Card className="mt-10 p-0 shadow-none border-none">
                        <CardHeader className='-mb-1'>
                            <h2 className="text-xl font-bold">Synopsis</h2>
                        </CardHeader >
                        <CardContent>
                            <p className="text-sm md:text-base">
                            Seorang pengepul rongsokan asal Madura yang hidup pas-pasan berharap bisa membesarkan usaha rombengnya dengan meminjam modal Bank. Suatu hari, ia menemukan sebuah pesawat UFO misterius yang terdampar di pinggiran kota. Berharap dapat menjual besi dari pesawat tersebut, ia malah mendapati ada alien di dalamnya yang harus diselamatkan.
                            </p>
                        </CardContent>
                    </Card>

                        {/* Progress */}
                    <Card className="mt-10 mb-10 p-0 shadow-none border-none">
                        <CardHeader className='-mb-1'>
                            <h2 className="text-xl font-bold">Progress</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">Development</span>
                                <span className="text-pink-500">100%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500" style={{ width: "100%" }}></div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className="font-semibold">Pre Production</span>
                                <span className="text-pink-500">100%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500" style={{ width: "100%" }}></div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className="font-semibold">Production</span>
                                <span className="text-pink-500">100%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500" style={{ width: "100%" }}></div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className="font-semibold">Post Production</span>
                                <span className="text-pink-500">100%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500" style={{ width: "100%" }}></div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className="font-semibold">Promo</span>
                                <span className="text-pink-500">100%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-500" style={{ width: "100%" }}></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


            </div>
        </AppLayout>
    );
}
