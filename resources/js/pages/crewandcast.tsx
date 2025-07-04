// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"; // Shadcn Dropdown

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Shadcn Alert Dialog

import { Input } from "@/components/ui/input"; // Shadcn Input
import { Label } from "@/components/ui/label"; // Shadcn Label
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Shadcn Select
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { Badge } from "@/components/ui/badge"; // Shadcn Badge
import { DropdownMenu } from "@/components/ui/dropdown-menu"; // Shadcn Dropdown
import { CheckIcon, Filter, Ellipsis, PencilIcon } from "lucide-react";
import { useEffect } from 'react';
import axios from 'axios';
import { startPreloader, stopPreloader }  from '@/components/preloader';
import { Sheet,  SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { toast } from 'react-toastify';
// import qs from 'qs'; // Untuk mengirim data form dengan multipart/form-data

// import 'react-toastify/dist/ReactToastify.css';
// import { Check } from 'lucide-react'; // Shadcn Check Icon

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
        image: string | File | null;
        nick_name: string;
        job_title: string;
        full_name: string;
        home_town: string;
        email: string;
        phone: string;
        address: string;
        group: string;
        category: string;
    }

    const [crewAndCasts, setCrewAndCasts] = useState<Record<string, Record<string, Member>>>(() => ({}));
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [crewDetails, setCrewDetails] = useState<CrewDetails | null>(null);
    const [openSheet, setOpenSheet] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAddCrewSheetOpen, setIsAddCrewSheetOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [isDeleteDropDown, setIsDeleteDropDown] = useState(false);
    const [isUpdateCrewSheetOpen, setIsUpdateCrewSheetOpen] = useState(false);
    const [crewToUpdate, setCrewToUpdate] = useState<CrewDetails | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);


    const [filters, setFilters] = useState({
        crew: false,
        cast: false,
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Perbarui state newCrew dengan file gambar
            setNewCrew((prev) => ({ ...prev, image: file }));
            setCrewToUpdate((prev) => ({ ...prev!, image: file }));

            // Generate preview gambar
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            // Reset state jika tidak ada file yang dipilih
            setNewCrew((prev) => ({ ...prev, image: null }));
            setCrewToUpdate((prev) => ({ ...prev!, image: null }));
            setImagePreview(null);
        }
    };

    useEffect(() => {
        const apiUrl = 'http://localhost:8000/api/crew-and-cast';

        startPreloader();

        // Prepare filter params
        const params: { project_id: number, search?: string, filter?: { crew?: boolean; cast?: boolean } } = {
            project_id: 2,
        };

        // Tambahkan search term jika ada
        if (search.trim()) {
            params.search = search.trim();
        }

        // Tambahkan filter crew / cast jika aktif
        if (filters.crew || filters.cast) {
            params.filter = {};
            if (filters.crew) params.filter.crew = true;
            if (filters.cast) params.filter.cast = true;
        }

        axios.get(apiUrl, { params })
            .then((response) => {
                setCrewAndCasts(response.data);
                // console.log(response.data)
                stopPreloader();
            })
            .catch((err) => {
                setError(err.message);
                console.error('Error fetching data:', err);
                stopPreloader();
            });
    }, [search, filters]);


     // Fetch crew details based on ID
    const fetchCrewDetails = async (id:number) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/crew-and-cast/${id}`); // Replace with your API endpoint
            setCrewDetails(response.data);
            setOpenSheet(true); // Open the sheet to show crew details
            window.history.pushState(null, "", window.location.href); // Update URL without reloading
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
            formData.append("project_id", "2");
            formData.append("nick_name", newCrew.nick_name);
            formData.append("job_title", newCrew.job_title);
            formData.append("full_name", newCrew.full_name || ''); // Tambahkan default value jika kosong
            formData.append("email", newCrew.email || '');
            formData.append("phone", newCrew.phone || '');
            formData.append("date_birth", newCrew.date_birth || '');
            formData.append("home_town", newCrew.home_town || '');
            formData.append("group", newCrew.group || '');
            formData.append("category", newCrew.category || '');
            formData.append("character_name", newCrew.character_name || '');
            formData.append("description", newCrew.description || '');
            formData.append("address", newCrew.address || '');
            if (newCrew.image instanceof globalThis.File) {
                formData.append("image", newCrew.image);
            }



            const response = await axios.post("http://localhost:8000/api/crew-and-cast", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",

                },
            });

            // console.log("Crew added successfully:", response.data);
            setIsAddCrewSheetOpen(false); // Close the sheet
            console.log("Crew added successfully:", response);
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

            setImagePreview(null); // Reset image preview
            await fetchAllCrews();
            toast.success('Crew added successfully!');

        } catch (error) {
            // toast.error('Failed to add crew. Please try again.');
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'An error occurred while adding crew.');
                console.error("Axios error:", error.response?.data);
            } else {
                console.error("Unexpected error:", error);
                toast.error('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (id: number | undefined) => {
        if (!id) {
            console.error("No crew ID provided for deletion.");
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:8000/api/crew-and-cast/${id}`);
            console.log("Crew deleted successfully:", response.data);

            // Update state untuk menghapus crew dari tampilan
            await fetchAllCrews();

            // Tutup modal detail jika crew yang dihapus sedang ditampilkan
            if (crewDetails?.id === id) {
                setOpenSheet(false); // Tutup modal detail
                setCrewDetails(null); // Reset detail crew
            }

            // Tampilkan notifikasi sukses
            toast.success('Crew deleted successfully!');
        } catch (error) {
            console.error("Error deleting crew:", error);

            // Tampilkan notifikasi gagal
            toast.error('Failed to delete crew. Please try again.');
        }

        // Tampilkan toast konfirmasi

    };

    const handleEditClick = () => {
        if (crewDetails) {
            setCrewToUpdate(crewDetails); // Set data crew untuk di-update
            setIsUpdateCrewSheetOpen(true); // Buka sheet update
            window.history.pushState(null, "", window.location.href);
        }
    };

    const handleUpdateCrewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(); // Gunakan FormData untuk mendukung file upload
            formData.append("_method", "PUT"); // Simulasikan metode PUT
            formData.append("project_id", "2");
            formData.append("nick_name", crewToUpdate?.nick_name || "");
            formData.append("job_title", crewToUpdate?.job_title || "");
            formData.append("full_name", crewToUpdate?.full_name || "");
            formData.append("email", crewToUpdate?.email || "");
            formData.append("phone", crewToUpdate?.phone || "");
            formData.append("address", crewToUpdate?.address || "");
            formData.append("date_birth", crewToUpdate?.date_birth || "");
            formData.append("home_town", crewToUpdate?.home_town || "");
            formData.append("group", crewToUpdate?.group || "");
            formData.append("category", crewToUpdate?.category || "");
            formData.append("character_name", crewToUpdate?.character_name || "");
            formData.append("description", crewToUpdate?.description || "");

            // Tambahkan gambar jika ada
           // Tambahkan gambar jika ada
            if (crewToUpdate && crewToUpdate.image instanceof File) {
                formData.append("image", crewToUpdate.image);
            } else if (typeof crewToUpdate?.image === "string") {
                // Jika image adalah URL string, tambahkan sebagai field biasa
                formData.append("image", crewToUpdate.image);
            }
            // console.log("Form data to be sent:", formData.get("image"), crewToUpdate?.image);

            // Kirim data menggunakan axios dengan multipart/form-data
            const response = await axios.post(
                `http://localhost:8000/api/crew-and-cast/${crewToUpdate?.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Crew updated successfully:", response.data);

            // Perbarui data detail crew
            if (crewToUpdate?.id) {
                fetchCrewDetails(crewToUpdate.id);
            }

            await fetchAllCrews();

            toast.success("Crew updated successfully!");
            setIsUpdateCrewSheetOpen(false); // Tutup sheet
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred while updating crew.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (crewDetails?.image) {
            if (typeof crewDetails.image === 'string') {
                // setInitialImage(crewDetails.image); // Set URL gambar dari database
                setImagePreview(crewDetails.image); // Tampilkan preview gambar dari database
            } else if (crewDetails.image instanceof File) {
                const imageUrl = URL.createObjectURL(crewDetails.image);
                // setInitialImage(imageUrl); // Set URL preview dari objek File
                setImagePreview(imageUrl); // Tampilkan preview gambar dari objek File
            }
        } else {
            // setInitialImage(null); // Reset state jika tidak ada gambar
            // setImagePreview(null); // Reset preview jika tidak ada gambar
        }
    }, [crewDetails]);

    const handleDeleteImage = () => {
        setImagePreview(null); // Reset preview
        setNewCrew((prev) => ({ ...prev, image: null })); // Reset file gambar di state
        setCrewToUpdate((prev) => ({ ...prev!, image: null })); // Reset file gambar di state crew yang akan diupdate
    };

    const fetchAllCrews = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/api/crew-and-cast", {
                params: { project_id: 2 }, // Sesuaikan dengan parameter filter Anda
            });
            setCrewAndCasts(response.data); // Perbarui state list crew dengan data terbaru
        } catch (error) {
            console.error("Error fetching all crews:", error);
            toast.error("Failed to fetch updated crew list.");
        } finally {
            setLoading(false);
        }
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    const handleOpenAddSheet = () => {
        window.history.pushState(null, "", window.location.href); // Tambahkan state ke history
        setIsAddCrewSheetOpen(true);
        setImagePreview(null);
    };


    useEffect(() => {
        const handlePopState = () => {
            // Prioritaskan penutupan sheet berdasarkan urutan
            if (isUpdateCrewSheetOpen) {
                setIsUpdateCrewSheetOpen(false); // Tutup sheet edit
            } else if (openSheet) {
                setOpenSheet(false); // Tutup sheet detail
            } else if (isAddCrewSheetOpen) {
                setIsAddCrewSheetOpen(false); // Tutup sheet add crew
            }
            // Jika tidak ada sheet yang terbuka, biarkan aplikasi kembali ke halaman sebelumnya
        };

        // Tambahkan event listener untuk popstate
        window.addEventListener('popstate', handlePopState);

        return () => {
            // Hapus event listener saat komponen unmount
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isUpdateCrewSheetOpen, openSheet, isAddCrewSheetOpen]);

    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Tampilkan error jika ada */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <Head title="Crew and Cast" />

            <div className=" min-h-screen py-4 px-6 space-y-6">
                <div className="flex justify-between items-center mb-4">
                <Button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center" onClick={handleOpenAddSheet}>
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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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
                            <Card key={idx} className="flex flex-row justify-items-center py-0 gap-0 min-h-20 overflow-hidden"
                                    onClick={() => handleMemberClick(member.id)}
                                >
                                <CardHeader className="w-30 p-0 rounded-sm overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${member.image ?? '/logoFoufo.png'})` }}>
                                </CardHeader>
                                <CardContent className="px-0 ps-5 w-full flex flex-col justify-center">
                                    <h2 className="font-semibold text-l text-left">{member.nick_name}</h2>
                                    <p className="text-m text-pink-500 text-left">{member.job_title}</p>
                                </CardContent>
                                <CardFooter className="px-2">
                                    <Button variant="ghost" size="icon">
                                        {/* <MoreHorizontal className="w-5 h-5" /> */}
                                    </Button>
                                </CardFooter>
                            </Card>

                        ))}
                    </div>
                ))}
            </div>

            <Sheet open={openSheet} onOpenChange={setOpenSheet}>

                <SheetContent className='gap-0 w-full'>
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
                            src={typeof crewDetails.image === 'string' ? crewDetails.image : crewDetails.image ? URL.createObjectURL(crewDetails.image) : "/logoFoufo.png"}
                            alt={crewDetails.full_name}
                            className="w-full h-66 object-cover mb-4"
                            />

                            {/* Crew details */}
                            <div className="space-y-2 px-4">
                                <h2 className="text-xl font-bold mb-0">{crewDetails.nick_name}</h2>
                                <p className="text-md text-pink-500 mt-0">{crewDetails.job_title}</p>

                                {/* Edit button */}
                                {/* <button className="bg-pink-500 text-white px-3 py-1 rounded-md">Edit</button>
                                <button className="bg-gray-500 text-white px-3 py-1 rounded-md"></button> */}
                                <div className="flex justify-center gap-2 mb-4 ">
                                    <Button variant="outline" onClick={handleEditClick}>
                                        <PencilIcon className="mr-2 w-4 h-4" /> Edit
                                    </Button>
                                    <DropdownMenu open={isDeleteDropDown} onOpenChange={setIsDeleteDropDown}>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            <Ellipsis />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setIsDeleteDialogOpen(true); // Panggil fungsi delete dengan ID crew
                                            }}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </div>
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
                        <SheetDescription className='text-center hidden'>
                            Section for adding crew or cast data.
                        </SheetDescription>
                    </SheetHeader>

                    <form onSubmit={handleAddCrewSubmit} className="space-y-4 px-6">
                        {/* Nick Name */}
                        <div className="space-y-2">
                            <Label htmlFor="nick_name">Nick Name<span className="text-red-500 ml-1">*</span></Label>
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
                            <Label>Category<span className="text-red-500 ml-1">*</span></Label>
                            <Select
                                value={newCrew.category}
                                onValueChange={(value) => setNewCrew({ ...newCrew, category: value })}
                                required
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

                        {/* Preview Image */}
                        {imagePreview && (
                            <div className="mt-2 relative">
                                {/* Gambar Preview */}
                                <img
                                    src={typeof imagePreview === 'string' ? imagePreview : ''}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-md border"
                                />
                                {/* Tombol Silang */}
                                <button
                                    type="button"
                                    onClick={handleDeleteImage} // Hapus gambar saat tombol diklik
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    X
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button type="submit" className="w-full bg-purple-600 text-white mt-5">
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                </SheetContent>
            </Sheet>

            <Sheet open={isUpdateCrewSheetOpen} onOpenChange={setIsUpdateCrewSheetOpen}>
                <SheetContent className="w-full overflow-y-auto pb-10">
                    <SheetHeader>
                        <SheetTitle className="text-center">Update Crew or Cast</SheetTitle>
                    </SheetHeader>
                    <SheetDescription className='text-center hidden'>
                        Update information for the selected crew or cast member.
                    </SheetDescription>
                    <form onSubmit={handleUpdateCrewSubmit} className="space-y-4 px-6">
                        {/* Nick Name */}
                        <div className="space-y-2">
                            <Label htmlFor="nick_name">Nick Name<span className="text-red-500 ml-1">*</span></Label>
                            <Input
                                id="nick_name"
                                type="text"
                                value={crewToUpdate?.nick_name || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        nick_name: e.target.value,
                                    })
                                }
                                required
                                placeholder="Enter Nick Name"
                            />
                        </div>

                        {/* Job Title */}
                        <div className="space-y-2">
                            <Label htmlFor="job_title">Job Title</Label>
                            <Input
                                id="job_title"
                                type="text"
                                value={crewToUpdate?.job_title || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        job_title: e.target.value,
                                    })
                                }
                                placeholder="Enter Job Title"
                            />
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input
                                id="full_name"
                                type="text"
                                value={crewToUpdate?.full_name || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        full_name: e.target.value,
                                    })
                                }
                                placeholder="Enter Full Name"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={crewToUpdate?.email || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        email: e.target.value,
                                    })
                                }
                                placeholder="Enter Email"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="text"
                                value={crewToUpdate?.phone || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        phone: e.target.value,
                                    })
                                }
                                placeholder="Enter Phone Number"
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                type="text"
                                value={crewToUpdate?.address || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        address: e.target.value,
                                    })
                                }
                                placeholder="Enter Address"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-2">
                            <Label htmlFor="date_birth">Date of Birth</Label>
                            <Input
                                id="date_birth"
                                type="date"
                                className='block w-full'
                                value={crewToUpdate?.date_birth || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        date_birth: e.target.value,
                                    })
                                }
                                placeholder="Select Date of Birth"
                            />
                        </div>

                        {/* Home Town */}
                        <div className="space-y-2">
                            <Label htmlFor="home_town">Home Town</Label>
                            <Input
                                id="home_town"
                                type="text"
                                value={crewToUpdate?.home_town || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        home_town: e.target.value,
                                    })
                                }
                                placeholder="Enter Home Town"
                            />
                        </div>

                        {/* Group */}
                        <div className="space-y-2">
                            <Label htmlFor="group">Group</Label>
                            <Input
                                id="group"
                                type="text"
                                value={crewToUpdate?.group || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        group: e.target.value,
                                    })
                                }
                                placeholder="Enter Group"
                            />
                        </div>

                        {/* Category (Crew or Cast) */}
                        <div className="space-y-2">
                            <Label>Category<span className="text-red-500 ml-1">*</span></Label>
                            <Select
                                value={crewToUpdate?.category || ""}
                                onValueChange={(value) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        category: value,
                                    })
                                }
                                required
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
                                value={crewToUpdate?.character_name || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        character_name: e.target.value,
                                    })
                                }
                                placeholder="Enter Character Name"
                            />
                        </div>

                        {/* Character Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Character Description</Label>
                            <Textarea
                                id="description"
                                value={crewToUpdate?.description || ""}
                                onChange={(e) =>
                                    setCrewToUpdate({
                                        ...crewToUpdate!,
                                        description: e.target.value,
                                    })
                                }
                                rows={3}
                                placeholder="Enter Character Description"
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

                        {/* Preview Image */}
                        {imagePreview && (
                            <div className="mt-2 relative">
                                <img
                                    src={typeof imagePreview === "string" ? imagePreview : ""}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-md border"
                                />
                                {/* Tombol Hapus Gambar */}
                                <button
                                    type="button"
                                    onClick={handleDeleteImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    X
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button type="submit" className="w-full bg-purple-600 text-white mt-5">
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </form>
                </SheetContent>
            </Sheet>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    </AlertDialogHeader>
                        <AlertDialogDescription>
                            This action cannot be undone. The selected crew member will be permanently deleted.
                        </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(crewDetails?.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </AppLayout>
    );
}
