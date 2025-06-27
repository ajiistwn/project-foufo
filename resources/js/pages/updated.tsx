// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React, { useState } from "react";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Shadcn Dropdown
import { Badge } from "@/components/ui/badge"; // Shadcn Badge
import { DropdownMenu } from "@/components/ui/dropdown-menu"; // Shadcn Dropdown
import { CheckIcon, Filter } from "lucide-react";
// import { type Filters } from '@/types/filters'; // Import tipe Filters jika ada

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Updated',
        href: '/updated',
    },
];
const meetings = [
    {
        section: "June 21",
        items: [
            {
            id: 1,
            title: "Shooting - Day 17",
            date: "June 21, 2025 at 8:00 AM",
            image: "https://picsum.photos/300/200",

            },
        ],
    },
    {
        section: "May 20",
        items: [
            {
                id: 2,
                title: "Shooting - Day 17",
                date: "June 21, 2025 at 8:00 AM",
                image: "https://picsum.photos/300/200",  // Gambar acak dari Picsum
            },
            {
                id: 3,
                title: "Shooting - Day 16",
                date: "June 20, 2025 at 7:30 AM",
                image: "https://picsum.photos/300/200?random=1", // Tambahkan ?random=x untuk variasi gambar
            },
            {
                id: 4,
                title: "Shooting - Day 15",
                date: "June 19, 2025 at 7:30 AM",
                image: "https://picsum.photos/300/200?random=2",
            },
            {
                id: 5,
                title: "Shooting - Day 14",
                date: "June 18, 2025 at 7:30 AM",
                image: "https://picsum.photos/300/200?random=3",
            },
            {
                id: 6,
                title: "Reading & Fitting Talent Surabaya",
                date: "June 17, 2025 at 12:00 PM",
                image: "https://picsum.photos/300/200?random=4",
            },
        ],
    },
    {
        section: "April 19",
        items: [
            {
                id: 7,
                title: "Shooting - Day 13 - Pending Scene",
                date: "June 15, 2025 at 7:30 PM",
                image: "https://picsum.photos/300/200?random=5",
            },
            {
                id: 8,
                title: "Shooting - Day 12",
                date: "June 14, 2025 at 6:30 PM",
                image: "https://picsum.photos/300/200?random=6",
            },
            {
                id: 9,
                title: "Shooting - Day 11",
                date: "June 13, 2025 at 8:30 AM",
                image: "https://picsum.photos/300/200?random=7",
            },
        ],
    },
];

export default function Updated() {

    const [filters, setFilters] = useState({
        finance: false,
        ipDevelopment: false,
        legal: false,
        preProduction: false,
    });

    // Handler untuk mengubah state checkbox
    interface Filters {
        finance: boolean;
        ipDevelopment: boolean;
        legal: boolean;
        preProduction: boolean;
    }

    const handleCheckboxChange = (filterName: keyof Filters): void => {
        setFilters((prevFilters: Filters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };

        // Handler untuk reset semua filter
    const resetFilters = () => {
            setFilters({
                finance: false,
            ipDevelopment: false,
            legal: false,
            preProduction: false,
        });
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Updated" />
            <div className="min-h-screen p-4 ">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <Button className="bg-purple-600 text-white px-4 py-2 rounded-md  flex items-center">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                        </svg> */}
                        <span>Add Mom</span>
                    </Button>

                    {/* Search and Filter */}
                </div>
                <div className="flex w-full gap-1 justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className=" px-2 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-600 border-2 w-[100%]"
                    />
                    <DropdownMenu>
                        {/* Trigger untuk membuka dropdown */}
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='p-5 m-0'>
                                <Filter className=" w-full m-0 h-10" />
                                {activeFiltersCount > 0 && (
                                    <Badge className='absolute ml-10 mb-10 bg-black text-white rounded-full ' variant="secondary">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>

                        {/* Konten dropdown */}
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("finance");}
                            }
                            >
                            <span>Finance</span>
                            {filters.finance && <CheckIcon className="h-4 w-4 text-green-500" />}
                            </DropdownMenuItem>

                            {/* Checkbox untuk Producer */}
                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("ipDevelopment");}
                            }
                            >
                            <span>Ip Development</span>
                            {filters.ipDevelopment && <CheckIcon className="h-4 w-4 text-green-500" />}
                            </DropdownMenuItem>

                            {/* Checkbox untuk Crew */}
                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("legal");
                            }}
                            >
                            <span>Legal</span>
                            {filters.legal && <CheckIcon className="h-4 w-4 text-green-500" />}
                            </DropdownMenuItem>

                            {/* Checkbox untuk Cast */}
                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("preProduction");
                            }}
                            >
                            <span>Pre Production</span>
                            {filters.preProduction && <CheckIcon className="h-4 w-4 text-green-500" />}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* Tombol Reset */}
                            <DropdownMenuItem
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            onClick={(event) => {
                            event.preventDefault();
                                resetFilters();

                            }}
                            >
                            Reset Filters
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>

                {/* Month Title */}
                {/* <h2 className="text-xl font-bold mb-4">June 2025</h2> */}

                {/* Grid Layout */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {meetings.map((meeting) => (
                    <Card key={meeting.id}  className='py-0 overflow-hidden gap-0 '>
                        <CardHeader className='w-full p-0 mt-0'>
                            <img
                                src={meeting.image}
                                alt={meeting.title}
                                width={300}
                                height={200}
                                className="w-full h-36 object-cover rounded-t"
                            />
                        </CardHeader>
                        <CardContent className='px-3 py-2'>
                            <div>
                                <span className="text-sm uppercase text-pink-500 font-semibold">{meeting.type}</span>
                                <h3 className="text-l font-bold  mb-1">{meeting.title}</h3>
                                <p className="text-sm text-gray-400">{meeting.date}</p>
                            </div>
                        </CardContent>
                    </Card>
                    ))}
                </div> */}
                {meetings.map((section, index) => (
                    <div key={index} className="space-y-2 my-5">
                        <h2 className="text-lg font-bold">{section.section}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            {section.items.map((item) => (
                                <Card key={item.id}  className='py-0 overflow-hidden gap-0 '>
                                    <CardHeader className='w-full p-0 mt-0'>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            width={300}
                                            height={200}
                                            className="w-full h-36 object-cover rounded-t"
                                        />
                                    </CardHeader>
                                    <CardContent className='px-3 py-2'>
                                    <div>
                                        <span className="text-sm uppercase text-pink-500 font-semibold">{section.section}</span>
                                        <h3 className="text-l font-bold  mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-400">{item.date}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            ))}
                        </div>
                    </div>
                ))}
                {/* Footer Navigation */}

             </div>

        </AppLayout>
    );
}
