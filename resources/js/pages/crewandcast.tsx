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

import { Input } from "@/components/ui/input"; // Shadcn Input
import { Label } from "@/components/ui/label"; // Shadcn Label
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Shadcn Select
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { Badge } from "@/components/ui/badge"; // Shadcn Badge
import { DropdownMenu } from "@/components/ui/dropdown-menu"; // Shadcn Dropdown
import { CheckIcon, Filter } from "lucide-react";
import { useEffect } from 'react';
import axios from 'axios';
import { startPreloader, stopPreloader }  from '@/components/preloader';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crew and Cast',
        href: '/crewandcast',
    },
];


export default function Crewandcast() {
    // State
    interface Member {
        id: number;
        image: string;
        nick_name: string;
        job_title: string;
    }
    // Define interface for detailed crew information
    interface CrewDetails {
        id: number;
        date_birth: string;
        character_name: string;
        description: string;

        image: string;
        nick_name: string;
        job_title: string;
        full_name: string;
        home_town: string;
        email: string;
        phone: string;
        address: string;
    }

    const [crewAndCasts, setCrewAndCasts] = useState<Record<string, Record<string, Member>>>(() => ({}));
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [crewDetails, setCrewDetails] = useState<CrewDetails | null>(null);
    const [openSheet, setOpenSheet] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAddCrewSheetOpen, setIsAddCrewSheetOpen] = useState(false);

    const [newCrew, setNewCrew] = useState<{
        nick_name: string;
        job_title: string;
        full_name: string;
        email: string;
        phone: string;
        address: string;
        date_birth: string;
        home_town: string;
        group: string;
        category: string;
        character_name: string;
        description: string;
        image: File | null;
    }>({
        nick_name: '',
        job_title: '',
        full_name: '',
        email: '',
        phone: '',
        address: '',
        date_birth: '',
        home_town: '',
        group: '',
        category: '',
        character_name: '',
        description: '',
        image: null,
    });



    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setNewCrew((prev) => ({ ...prev, image: file }));
        } else {
            setNewCrew((prev) => ({ ...prev, image: null }));
        }
    };

    useEffect(() => {
        // URL API aplikasi inti
        const apiUrl = 'http://localhost:8000/api/crew-and-cast';
        startPreloader();
        // Ambil data dari API
        axios.get(apiUrl)
            .then((response) => {
                console.log('Data dari API:', response); // Console log data
                setCrewAndCasts(response.data); // Simpan data ke state
                stopPreloader(); // Stop preloader
            })
            .catch((err) => {
                // console.error('Error fetching data:', err);
                setError(err.message);
                console.error('Error message:', error); // Console log error message
                stopPreloader();
            });
    }, []);

     // Fetch crew details based on ID
    const fetchCrewDetails = async (id:number) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/crew-and-cast/${id}`); // Replace with your API endpoint
            setCrewDetails(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching crew details:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleMemberClick = (id: number) => {
        // setSelectedMemberId(id);
        fetchCrewDetails(id);
    };


    const [filters, setFilters] = useState({
        crew: false,
        cast: false,
    });

    // Handler untuk mengubah state checkbox
    interface Filters {
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
            crew: false,
            cast: false,
        });
    };

    const handleAddCrewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("nick_name", newCrew.nick_name);
            formData.append("job_title", newCrew.job_title);
            formData.append("full_name", newCrew.full_name || ''); // Tambahkan default value jika kosong
            formData.append("email", newCrew.email || '');
            formData.append("phone", newCrew.phone || '');
            formData.append("address", newCrew.address || '');
            if (newCrew.image instanceof globalThis.File) {
                formData.append("image", newCrew.image);
            }

            const response = await axios.post("http://localhost:8000/api/crew-and-cast", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Crew added successfully:", response.data);
            setIsAddCrewSheetOpen(false); // Close the sheet
            setCrewAndCasts((prev) => {
                const updatedCrew = { ...prev };
                updatedCrew["New Group"] = {
                    ...(updatedCrew["New Group"] || {}),
                    [response.data.id]: response.data,
                };
                return updatedCrew;
            });

            // Reset form state
            setNewCrew({
                nick_name: "",
                job_title: "",
                full_name: "",
                email: "",
                phone: "",
                address: "",
                date_birth: "",
                home_town: "",
                group: "",
                category: "",
                character_name: "",
                description: "",
                image: null,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            setLoading(false);
        }
    };
    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crew and Cast" />
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <div className=" min-h-screen py-4 px-6 space-y-6">
                    <div className="flex justify-between items-center mb-4">
                    <Button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center" onClick={() => setIsAddCrewSheetOpen(true)}>
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


                    {Object.entries(crewAndCasts).map(([group, members], index) => (
                        <div key={index} className="space-y-2">
                            {/* console.log('Group:', group); */}
                            <h2 className="text-lg font-bold">{group}</h2>
                            {Object.entries(members).map(([idx, member]) => (
                                <SheetTrigger asChild key={idx}>
                                    <Card className="flex flex-row justify-items-center py-0 gap-0 min-h-20 overflow-hidden"
                                        onClick={() => handleMemberClick(member.id)}
                                    >
                                    <CardHeader className="w-30 p-0 rounded-sm overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${member.image ?? '/logoFoufo.png'})` }}>
                                    </CardHeader>
                                    <CardContent className="px-0 ps-5 w-full flex flex-col justify-center">
                                        <h2 className="font-semibold text-l text-left">{member.nick_name}</h2>
                                        <p className="text-m text-pink-500 text-left">{member.job_title}</p>
                                    </CardContent>

                                    </Card>
                                </SheetTrigger>
                            ))}
                        </div>
                    ))}
                </div>


                <SheetContent className='gap-0'>
                    <SheetHeader className='m-0'>
                        <SheetTitle className='text-center'>{loading ? 'Loading...' : crewDetails?.nick_name || ''}</SheetTitle>
                    </SheetHeader>

                    <SheetDescription className='text-center mb-4 hidden'>
                        {loading ? 'Loading details...' : crewDetails?.job_title || ''}
                    </SheetDescription>

                    {crewDetails && (
                        <div className=''>
                            {/* Crew profile image */}
                            <img
                            src={crewDetails.image ?? "/logoFoufo.png"}
                            alt={crewDetails.full_name}
                            className="w-full h-48 object-cover mb-4"
                            />

                            {/* Crew details */}
                            <div className="space-y-2 px-4">
                                <h2 className="text-xl font-bold mb-0">{crewDetails.nick_name}</h2>
                                <p className="text-md text-pink-500 mt-0">{crewDetails.job_title}</p>

                                {/* Edit button */}
                                {/* <button className="bg-pink-500 text-white px-3 py-1 rounded-md">Edit</button>
                                <button className="bg-gray-500 text-white px-3 py-1 rounded-md">...</button> */}
                            </div>

                            <ul className="p-4 *:mt-2 space-y-2">
                                    {/* Name */}
                                {crewDetails?.full_name && (
                                    <li className="flex items-center border-b border-gray-200 pb-1">
                                        <span className="text-gray-600 text-left ">Full Name</span>
                                        <span className="ml-auto text-gray-800 font-medium text-right">
                                            {crewDetails.full_name}
                                        </span>
                                    </li>
                                )}

                                {/* Email */}
                                {crewDetails?.email && (
                                    <li className="flex items-center border-b border-gray-200 pb-1">
                                    <span className="text-gray-600 text-left">Email</span>
                                    <span className="ml-auto text-gray-800 font-medium text-right">
                                        {crewDetails.email}
                                    </span>
                                </li>
                                )}

                                {/* Phone Number */}
                                {crewDetails?.phone && (
                                    <li className="flex items-center border-b border-gray-200 pb-1">
                                        <span className="text-gray-600 text-left">Phone</span>
                                        <span className="ml-auto text-gray-800 font-medium text-right">
                                            {crewDetails.phone}
                                        </span>
                                    </li>
                                )}

                                {/* Date Birth */}
                                {crewDetails?.date_birth && (
                                    <li className="flex items-center border-b border-gray-200 pb-1">
                                        <span className="text-gray-600 text-left">Date Birth</span>
                                        <span className="ml-auto text-gray-800 font-medium text-right">
                                            {crewDetails.date_birth}
                                        </span>
                                    </li>
                                )}

                                {/* Home Town */}
                                {crewDetails?.home_town && (
                                    <li className="flex items-center border-b border-gray-200 pb-1">
                                        <span className="text-gray-600 text-left">Home Town</span>
                                        <span className="ml-auto text-gray-800 font-medium text-right">
                                            {crewDetails.home_town}
                                        </span>
                                    </li>
                                )}

                                {/* Address */}
                                {crewDetails?.address && (
                                    <li className="flex items-center border-b border-gray-200 pb-1">
                                        <span className="text-gray-600 text-left">Address</span>
                                        <span className="ml-auto text-gray-800 font-medium text-right ps-2">
                                            {crewDetails.address}
                                        </span>
                                    </li>
                                )}

                                {/* Character Name */}
                                {crewDetails?.character_name && (
                                    <li className="flex items-center border-b border-gray-200 pb-1">
                                        <span className="text-gray-600 text-left">Character Name</span>
                                        <span className="ml-auto text-gray-800 font-medium text-right">
                                            {crewDetails.character_name}
                                        </span>
                                    </li>
                                )}

                                {/* Character Description */}
                                {crewDetails?.description && (
                                    <li className="flex items-center border-gray-200 pb-1">
                                        <span className="text-gray-600 text-left">Character Description</span>
                                        <span className="ml-auto text-gray-800 font-medium text-right">
                                            {crewDetails.description}
                                        </span>
                                    </li>
                                )}


                            </ul>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
            <Sheet open={isAddCrewSheetOpen} onOpenChange={setIsAddCrewSheetOpen} >
                <SheetContent className="w-full  overflow-y-auto pb-10" >
                    <SheetHeader>
                        <SheetTitle className="text-center">Add Crew or Cast</SheetTitle>
                        <SheetDescription className='text-center'>
                            Section for adding crew or cast data.
                        </SheetDescription>
                    </SheetHeader>

                    <form onSubmit={handleAddCrewSubmit} className="space-y-4 px-6">
                        {/* Nick Name */}
                        <div className="space-y-2">
                            <Label htmlFor="nick_name">Nick Name</Label>
                            <Input
                                id="nick_name"
                                type="text"
                                value={newCrew.nick_name}
                                onChange={(e) => setNewCrew({ ...newCrew, nick_name: e.target.value })}
                                required
                                placeholder='Enter Nick Name'
                            />
                        </div>

                        {/* Job Title */}
                        <div className="space-y-2">
                            <Label htmlFor="job_title">Job Title</Label>
                            <Input
                                id="job_title"
                                type="text"
                                value={newCrew.job_title}
                                onChange={(e) => setNewCrew({ ...newCrew, job_title: e.target.value })}
                                required
                                placeholder='Enter Job Title'
                            />
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input
                                id="full_name"
                                type="text"
                                value={newCrew.full_name}
                                onChange={(e) => setNewCrew({ ...newCrew, full_name: e.target.value })}
                                placeholder='Enter Full Name'
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={newCrew.email}
                                onChange={(e) => setNewCrew({ ...newCrew, email: e.target.value })}
                                placeholder='Enter Email'
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="text"
                                value={newCrew.phone}
                                onChange={(e) => setNewCrew({ ...newCrew, phone: e.target.value })}
                                placeholder='Enter Phone Number'
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                type="text"
                                value={newCrew.address}
                                onChange={(e) => setNewCrew({ ...newCrew, address: e.target.value })}
                                placeholder='Enter Address'
                            />
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-2">
                            <Label htmlFor="date_birth">Date of Birth</Label>
                            <Input
                                className='block w-full'
                                id="date_birth"
                                type="date"
                                value={newCrew.date_birth}
                                onChange={(e) => setNewCrew({ ...newCrew, date_birth: e.target.value })}
                                placeholder='Select Date of Birth'
                            />
                        </div>

                        {/* Home Town */}
                        <div className="space-y-2">
                            <Label htmlFor="home_town">Home Town</Label>
                            <Input
                                id="home_town"
                                type="text"
                                value={newCrew.home_town}
                                onChange={(e) => setNewCrew({ ...newCrew, home_town: e.target.value })}
                                placeholder='Enter Home Town'
                            />
                        </div>

                        {/* Group */}
                        <div className="space-y-2">
                            <Label htmlFor="group">Group</Label>
                            <Input
                                id="group"
                                type="text"
                                value={newCrew.group}
                                onChange={(e) => setNewCrew({ ...newCrew, group: e.target.value })}
                                placeholder='Enter Group'
                            />
                        </div>

                        {/* Category (Crew or Cast) */}
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                                value={newCrew.category}
                                onValueChange={(value) => setNewCrew({ ...newCrew, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="crew">Crew</SelectItem>
                                    <SelectItem value="cast">Cast</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Character Name */}
                        <div className="space-y-2">
                            <Label htmlFor="character_name">Character Name</Label>
                            <Input
                                id="character_name"
                                type="text"
                                value={newCrew.character_name}
                                onChange={(e) => setNewCrew({ ...newCrew, character_name: e.target.value })}
                                placeholder='Enter Character Name'
                            />
                        </div>

                        {/* Character Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Character Description</Label>
                            <Textarea
                                id="description"
                                value={newCrew.description}
                                onChange={(e) => setNewCrew({ ...newCrew, description: e.target.value })}
                                rows={3}
                                placeholder='Enter Character Description'
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="image">Image Upload</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full bg-purple-600 text-white mt-5">
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                </SheetContent>
            </Sheet>

        </AppLayout>
    );
}
