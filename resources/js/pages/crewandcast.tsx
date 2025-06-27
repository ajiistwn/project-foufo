// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
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
import { useEffect } from 'react';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crew and Cast',
        href: '/crewandcast',
    },
];

const data: { section: string; items: { title: string; group: string; image: string; }[]; }[] = [
    {
    section: "Producer",
    items: [
        {
            title: "Ricky",
            group: "Producer",
            image: "https://picsum.photos/60?random=1",
        },
        {
            title: "Rini",
            group: "Assistant Producer",
            image: "https://picsum.photos/60?random=1",
        },
    ],
    },
    {
    section: "Director",
    items: [
        {
        title: "Bayu SKAK",
        group: "Director",
        image: "https://picsum.photos/60?random=2",
        },
        {
        title: "Yudish PW",
        group: "Assistant Director",
        image: "https://picsum.photos/60?random=3",
        },
        {
        title: "Biandi Gagah Syahputra",
        group: "Script Continuity",
        image: "https://picsum.photos/60?random=4",
        },
    ],
    },
    {
    section: "Main Cast",
    items: [
        {
        title: "Tretan muslim",
        group: "Lead Actor",
        image: "https://picsum.photos/60?random=7",
        },
        {
        title: "New Cast Member",
        group: "Stand in Fouf",
        image: "https://picsum.photos/60?random=8",
        },
    ],
    },
];



export default function Crewandcast() {
    // State
    const [crewAndCasts, setCrewAndCasts] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // URL API aplikasi inti
        const apiUrl = 'http://localhost:8000/api/crew-and-casts';

        // Ambil data dari API
        axios.get(apiUrl)
            .then((response) => {
                console.log('Data dari API:', response.data); // Console log data
                setCrewAndCasts(response.data); // Simpan data ke state
                console.log('Crew and Casts:', crewAndCasts); // Console log state crewAndCasts
                // setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError(err.message);
                console.error('Error message:', error); // Console log error message
                // setLoading(false);
            });
    }, []);


    const [filters, setFilters] = useState({
        producer: false,
        crew: false,
        cast: false,
    });

    // Handler untuk mengubah state checkbox
    interface Filters {
        producer: boolean;
        crew: boolean;
        cast: boolean;
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
            producer: false,
            crew: false,
            cast: false,
        });
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crew and Cast" />
            <div className=" min-h-screen py-4 px-6 space-y-6">
                <div className="flex justify-between items-center mb-4">
                <Button className="bg-purple-600 text-white px-4 py-2 rounded-md  flex items-center">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                    </svg> */}
                    <span>Add Crew</span>
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

                            {/* Checkbox untuk Producer */}
                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("producer")}
                            }
                            >
                            <span>Producer</span>
                            {filters.producer && <CheckIcon className="h-4 w-4 text-green-500" />}
                            </DropdownMenuItem>

                            {/* Checkbox untuk Crew */}
                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("crew");
                            }}
                            >
                            <span>Crew</span>
                            {filters.crew && <CheckIcon className="h-4 w-4 text-green-500" />}
                            </DropdownMenuItem>

                            {/* Checkbox untuk Cast */}
                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("cast");
                            }}
                            >
                            <span>Cast</span>
                            {filters.cast && <CheckIcon className="h-4 w-4 text-green-500" />}
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

                {data.map((section, index) => (
                    <div key={index} className="space-y-2">
                        <h2 className="text-lg font-bold">{section.section}</h2>
                        {section.items.map((item, idx) => (
                            <Card key={idx} className="flex flex-row justify-items-center py-0 gap-0 min-h-20 overflow-hidden">
                                <CardHeader className="w-30 p-0 rounded-sm overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${item.image})` }}>
                                </CardHeader>
                                <CardContent className="px-0 ps-5 w-full flex flex-col justify-center">
                                    <h2 className="font-semibold text-l text-left">{item.title}</h2>
                                    <p className="text-m text-pink-500 text-left">{item.group}</p>
                                </CardContent>
                                {/* < CardFooter className="px-2">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="w-5 h-5 " />
                                    </Button>
                                </CardFooter> */}
                            </Card>
                        ))}
                    </div>
                ))}
            </div>

        </AppLayout>
    );
}
