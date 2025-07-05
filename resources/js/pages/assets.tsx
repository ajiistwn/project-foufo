// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import React, { useState } from "react";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Shadcn Dropdown
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"; // Shadcn Alert Dialog
// import { useHistory } from 'react-router-dom'; // React Router for navigation
// import { Button } from "@/components/ui/button"; // Shadcn
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"; // Shadcn Sheet
import { Input } from "@/components/ui/input"; // Shadcn Input
import { Label } from "@/components/ui/label"; // Shadcn Label
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component
import { Badge } from "@/components/ui/badge"; // Shadcn Badge
import { DropdownMenu } from "@/components/ui/dropdown-menu"; // Shadcn Dropdown
import { CheckIcon, Filter } from "lucide-react";
import { useEffect } from 'react';
import axios from 'axios';
import { Url } from 'url';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: '/assets',
    },
];



export default function Assets() {
    const [loading, setLoading] = useState(false);
    const [sheetAddFile, setSheetAddFile] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [filePreview, setFilePreview] = useState<{ name: string; type: string; size: number } | null>(null);
     // State for file addition form
     interface FormDataState {
        id?: number;
        name: string;
        category_documents_id: number | null;
        file_source: Url | string;
        image: File | null;
        file: File | null;
    }

    const [formData, setFormData] = useState<FormDataState>({
        name: "",
        category_documents_id: null,
        file_source: "",
        image: null,
        file: null,
    });

    interface FileItem {
        id: number;
        name: string;
        image: string;
        created_at: string;
        file_source: string;
    }
    const [listFiles, setListFiles] = useState<Record<string, FileItem[]>>({});
    // const [data, setData] = useState<{ section: string; items: { title: string; date: string; image: string; categoryDocument?: string; }[]; }[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    // const userAccess = "admin"; // Ganti dengan akses pengguna yang sesuai
    const [filters, setFilters] = useState({
        legal: false,
        finance: false,
        businessDevelopment: false,
        ipDevelopment: false,
        preProduction: false,
        production: false,
        postProduction: false,
        promo: false,
    });


    // Handler untuk mengubah state checkbox
    interface Filters {
        legal: boolean,
        finance: boolean,
        businessDevelopment: boolean,
        ipDevelopment: boolean,
        preProduction: boolean,
        production: boolean,
        postProduction: boolean,
        promo: boolean,
    }

    const resetForm = () => {
        setFormData({
            name: "",
            category_documents_id: null,
            file_source: "",
            image: null,
            file: null,
        });
        setImagePreview(null);
        setFilePreview(null);
    };

    async function fetchAllFile() {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/api/file-and-data", { params: { project_id: 2 } });
            // console.log(response.data); // Tangkap data dari backend
            setListFiles(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data files:', err);
            setLoading(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "file") => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                [type]: file,
            }));

            // For image preview
            if (type === "image") {
                const reader = new FileReader();
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    setImagePreview(event.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
              // Handle file preview for non-image files
            if (type === "file") {
                setFilePreview({
                    name: file.name,
                    type: file.type || "Unknown",
                    size: file.size,
                });
            }
        }
    };

    const handleCheckboxChange = (filterName: keyof Filters): void => {
        setFilters((prevFilters: Filters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };



        // Handler untuk reset semua filter
    const resetFilters = () => {
        setFilters({
            legal: false,
            finance: false,
            businessDevelopment: false,
            ipDevelopment: false,
            preProduction: false,
            production: false,
            postProduction: false,
            promo: false,
        });
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    useEffect(() => {
        const fetchData = async () => {
            const activeFilters = Object.entries(filters)
                .filter(([, value]) => value)
                .map(([key]) => key);
            const params = {
                project_id: 2, // Ganti dengan ID proyek yang sesuai
                filters: activeFilters, // Use activeFilters instead of activeCategoryIds
                search: searchQuery,              // Kirim search query
            };
            try {

                const response = await axios.get("http://localhost:8000/api/file-and-data", { params });
                // console.log(response.data); // Tangkap data dari backend
                setListFiles(response.data);
            } catch (err) {
                console.error('Error fetching data files:', err);
            }
        };

        fetchData();
    }, [filters, searchQuery]);

    //open add sheet
    const [categoryDocuments, setCategoryDocuments] = useState([
        { id: 1, name: "Design" },
        { id: 2, name: "Legal" },
        { id: 3, name: "Finance" },
        { id: 4, name: "Business Development" },
    ]);

    function openAddSheet() {
        setSheetAddFile(true);
        fetchCategoryDocuments();
        history.pushState(null, '', window.location.pathname); // Update URL without reloading
    }

    async function fetchCategoryDocuments() {
        try {
            const response = await axios.get("http://localhost:8000/api/file-and-data/category-documents"); // Update the endpoint if necessary
            // console.log(response.data); // Tangkap data dari backend
            setCategoryDocuments(response.data);
        } catch (err) {
            console.error('Error fetching category documents:', err);
        }
    }




    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if(!formData.category_documents_id) {
            toast.error("Please select a category document.");
            setLoading(false);
            return;
        }

        try {
            // Simulate form submission (replace with actual API call)
            const formDataToSend = new FormData();
            formDataToSend.append("project_id", '2');
            formDataToSend.append("name", formData.name);
            formDataToSend.append("category_documents_id", formData.category_documents_id !== null ? formData.category_documents_id.toString() : "");
            formDataToSend.append("file_source", formData.file_source.toString());
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }
            if (formData.file) {
                formDataToSend.append("file", formData.file);
            }

            // Example API call
            const response = await axios.post("http://localhost:8000/api/file-and-data", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });



            // Reset form and close sheet
            setFormData({
                name: "",
                category_documents_id: null,
                file_source: "",
                image: null,
                file: null,
            });
            setSheetAddFile(false);
            resetForm();
            fetchAllFile(); // Refresh the file list
            toast.success(`File added successfully: ${response.data}`);
        } catch (error) {
            // console.error("Error submitting form:", error);
            toast.error(`Failed to add file. Please try again.${error}`);
        } finally {
            setLoading(false);
        }
    };

    const [openEditSheet, setOpenEditSheet] = useState(false);
    // Fungsi untuk menangani aksi edit
    const handleEdit = async (id: number) => {
        fetchCategoryDocuments();
        try {
            const response = await axios.get(`http://localhost:8000/api/file-and-data/${id}`);
            const fileData = response.data;

            // Isi form dengan data dari backend
            setFormData(fileData);
            // console.log(fileData);

            // Jika ada gambar, tampilkan preview
            if (fileData.image) {
                setImagePreview(fileData.image);
            }
            history.pushState(null, '', window.location.pathname);

            // Buka sheet edit
            setOpenEditSheet(true);
        } catch (err) {
            console.error('Error fetching file ', err);
            toast.error("Failed to fetch file data.");
        }
    };
    // Submit form edit
    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if(!formData.category_documents_id) {
            toast.error("Please select a category document.");
            setLoading(false);
            return;
        }


            try {
            const formDataToSend = new FormData();
            formDataToSend.append("_method", "PUT"); // Simulasikan metode PUT
            formDataToSend.append("project_id", '2'); // Ganti dengan ID proyek yang sesuai
            formDataToSend.append("name", formData.name);
            formDataToSend.append("category_documents_id", formData.category_documents_id?.toString() || "");
            formDataToSend.append("file_source", formData.file_source.toString());

            // Append image if exists
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            // Append file if exists
            if (formData.file) {
                formDataToSend.append("file", formData.file);
            }

            // Kirim data ke backend
            await axios.post(`http://localhost:8000/api/file-and-data/${formData.id}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Reset form & close sheet
            resetForm();
            fetchAllFile(); // Refresh daftar file
            setOpenEditSheet(false);
            toast.success("File updated successfully");
        } catch (error) {
            console.error("Error updating file:", error);
            toast.error("Failed to update file.");
        } finally {
            setLoading(false);
        }
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState<FileItem | null>(null);
    const openDeleteModal = (file: FileItem) => {
        setFileToDelete(file);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setFileToDelete(null);
        window.location.reload();
    };
    // Fungsi untuk menangani aksi delete
    const handleDeleteFile = async () => {
        if (!fileToDelete) return;

        try {
            await axios.delete(`http://localhost:8000/api/file-and-data/${fileToDelete.id}`);
            // console.log("File deleted successfully");
            toast.success("File deleted successfully");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting file:", error);
            toast.error("Failed to delete file: " + error);
        } finally {
            closeDeleteModal();
        }
    };

    // useEffect untuk sheet tambah
    useEffect(() => {
        if (!sheetAddFile) {
            resetForm(); // Reset form jika sheet tambah ditutup
        }
    }, [sheetAddFile]);

    // useEffect untuk sheet edit
    useEffect(() => {
        if (!openEditSheet) {
            resetForm(); // Reset form jika sheet edit ditutup
        }
    }, [openEditSheet]);

    useEffect(() => {
        // Fungsi untuk menangani tombol back atau silang
        const handlePopState = () => {
            if (sheetAddFile || openEditSheet) {
                // Tutup sheet jika sedang terbuka
                setSheetAddFile(false);
                setOpenEditSheet(false);
                resetForm(); // Reset form saat sheet ditutup
            }
        };

        // Tambahkan listener popstate
        window.addEventListener("popstate", handlePopState);

        // Cleanup listener saat komponen unmount
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [sheetAddFile, openEditSheet]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assets" />
            <div className=" min-h-screen py-4 px-6 space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <Button className="bg-purple-600 text-white px-4 py-2 rounded-md  flex items-center" onClick={openAddSheet}>
                        <span>Add Asset</span>
                    </Button>

                    {/* Search and Filter */}
                </div>
                <div className="flex w-full justify-between gap-1">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className=" px-2 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-600 border-2 w-full"
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
                                handleCheckboxChange("legal");
                            }}
                            >
                                <span>Legal</span>
                            {filters.legal && <CheckIcon className="h-4 w-4 text-green-500" />}
                            </DropdownMenuItem>

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

                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("businessDevelopment");}
                            }
                            >
                            <span>Business Development</span>
                            {filters.businessDevelopment && <CheckIcon className="h-4 w-4 text-green-500" />}
                            </DropdownMenuItem>

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

                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("production");}
                            }
                            >
                            <span>Production</span>
                            {filters.production && <CheckIcon className="h-4 w-4 text-green-500" />}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("postProduction");}
                            }
                            >
                            <span>Post Production</span>
                            {filters.postProduction && <CheckIcon className="h-4 w-4 text-green-500" />}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(event) => {
                                event.preventDefault();
                                handleCheckboxChange("promo");}
                            }
                            >
                            <span>Promo</span>
                            {filters.promo && <CheckIcon className="h-4 w-4 text-green-500" />}
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

                {Object.entries(listFiles).map(([group, files], index) => (
                <div key={index} className="space-y-2 -mt-2">
                    {/* Judul Grup */}
                    <h2 className="text-lg font-bold">{group}</h2>

                    {/* Daftar Item dalam Grup */}
                    {files.map((file, idx) => (
                        <Card key={idx} className="flex flex-row justify-items-center py-0 gap-0 min-h-20">
                            {/* Header Card (Gambar) */}
                            <CardHeader
                                className="w-30 p-0 rounded-sm overflow-hidden bg-cover bg-no-repeat bg-center"
                                style={{
                                    backgroundImage: file.image
                                        ? `url(${file.image})`
                                        : "url(/logoFoufo.png)", // Placeholder jika image null
                                }}
                            ></CardHeader>

                            {/* Konten Card */}
                            <CardContent className="px-0 ps-5 w-full flex flex-col justify-center"
                            onClick={() => {
                                if (file.file_source) {
                                    window.location.href = file.file_source;
                                } else {
                                    toast.error("File source is not available.");
                                }
                            }}>
                                {/* Judul Item */}
                                <h2 className="font-semibold text-m text-left">{file.name}</h2>

                                {/* Tanggal Item */}
                                <p className="text-xs text-left text-pink-500">
                                    {new Date(file.created_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </CardContent>

                            {/* Footer Card (Aksi Tambahan) */}
                            <CardFooter className="px-2">
                            <div inert={isDeleteModalOpen}>
                                <DropdownMenu>
                                    {/* Trigger untuk membuka dropdown */}
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    {/* Konten dropdown */}
                                    <DropdownMenuContent>
                                        <DropdownMenuItem
                                            onClick={() => handleEdit(file.id)}
                                            className="cursor-pointer"
                                        >
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => openDeleteModal(file)}
                                            className="text-red-500 cursor-pointer"
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ))}
            </div>
            <Sheet open={sheetAddFile} onOpenChange={setSheetAddFile} >
                <SheetContent className="w-full overflow-y-auto pb-10">
                    <SheetHeader>
                        <SheetTitle className="text-center">Add File & Data</SheetTitle>
                        <SheetDescription className="text-center hidden">
                            Section for adding file data.
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 px-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name<span className="text-red-500 ml-1">*</span></Label>
                            <Input
                                name="name"
                                type="text"
                                required
                                placeholder="Enter File Name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />

                        </div>

                        {/* Category Documents - Badges Selection */}
                        <div className="space-y-2">
                            <Label>Category Document<span className="text-red-500 ml-1">*</span></Label>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {categoryDocuments.map((category) => (
                                    <Badge
                                        key={category.id}
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                category_documents_id: prev.category_documents_id === category.id ? null : category.id,
                                            }))
                                        }
                                        className={`text-sm cursor-pointer px-4 py-2 rounded-full transition-all shadow-sm  ${
                                            formData.category_documents_id === category.id
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-50 text-gray-800 hover:bg-gray-300"
                                        }`}
                                    >
                                        {category.name}
                                    </Badge>
                                ))}
                            </div>

                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="file_source">File Url<span className="text-red-500 ml-1">*</span></Label>
                            <Input
                                name="file_source"
                                type="text"
                                required
                                placeholder="Enter File URL"
                                value={typeof formData.file_source === "string" ? formData.file_source : ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="file">File Upload<span className="text-gray-500 ml-1 text-[10px]">Max 10mb</span></Label>
                            <Input
                                id="file"
                                type="file"
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                onChange={(e) => handleFileChange(e, "file")}
                            />

                        </div>
                        {filePreview && (
                            <div className="mt-2 relative">
                                <div className="flex items-center gap-2 border p-2 rounded-md">
                                    <span>{filePreview.name}</span>
                                    <span className="text-xs text-gray-500">({(filePreview.size / 1024).toFixed(2)} KB)</span>
                                </div>
                                {/* Tombol Hapus File */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFilePreview(null);
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            file: null,
                                        }));
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    X
                                </button>
                            </div>
                        )}

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="image">Image Upload<span className="text-gray-500 ml-1 text-[10px]">Max 2mb</span></Label>
                            <div className="flex items-center flex-col gap-2">
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "image")}
                                />
                            </div>
                        </div>


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
                                    onClick={() => {
                                        setImagePreview(null);
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            image: null,
                                        }));
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    X
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button type="submit" className="w-full bg-purple-600 text-white mt-5">
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </SheetContent>
            </Sheet>

            <Sheet open={openEditSheet} onOpenChange={setOpenEditSheet}>
                <SheetContent className="w-full overflow-y-auto pb-10">
                    <SheetHeader>
                        <SheetTitle className="text-center">Update File & Data</SheetTitle>
                    </SheetHeader>
                    <SheetDescription className='text-center hidden'>
                        Update information for the selected file and data.
                    </SheetDescription>
                    <form onSubmit={handleUpdateSubmit} className="space-y-4 px-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name<span className="text-red-500 ml-1">*</span></Label>
                            <Input
                                name="name"
                                type="text"
                                required
                                placeholder="Enter File Name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Category Documents - Badges Selection */}
                        <div className="space-y-2">
                            <Label>Category Document<span className="text-red-500 ml-1">*</span></Label>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {categoryDocuments.map((category) => (
                                    <Badge
                                        key={category.id}
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                category_documents_id: prev.category_documents_id === category.id ? null : category.id,
                                            }))
                                        }
                                        className={`text-sm cursor-pointer px-4 py-2 rounded-full transition-all shadow-sm ${
                                            formData.category_documents_id === category.id
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-50 text-gray-800 hover:bg-gray-300"
                                        }`}
                                    >
                                        {category.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* File URL */}
                        <div className="space-y-2">
                            <Label htmlFor="file_source">File Url<span className="text-red-500 ml-1">*</span></Label>
                            <Input
                                name="file_source"
                                type="text"
                                required
                                placeholder="Enter File URL"
                                value={typeof formData.file_source === "string" ? formData.file_source : ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="file">File Upload<span className="text-gray-500 ml-1 text-[10px]">Max 10mb</span></Label>
                            <Input
                                id="file"
                                type="file"
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                onChange={(e) => handleFileChange(e, "file")}
                            />
                        </div>
                        {filePreview && (
                            <div className="mt-2 relative">
                                <div className="flex items-center gap-2 border p-2 rounded-md">
                                    <span>{filePreview.name}</span>
                                    <span className="text-xs text-gray-500">({(filePreview.size / 1024).toFixed(2)} KB)</span>
                                </div>
                                {/* Tombol Hapus File */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFilePreview(null);
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            file: null,
                                        }));
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    X
                                </button>
                            </div>
                        )}

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="image">Image Upload<span className="text-gray-500 ml-1 text-[10px]">Max 2mb</span></Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "image")}
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
                                    onClick={() => {
                                        setImagePreview(null);
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            image: null,
                                        }));
                                    }}
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


            {/* confirm modal delete*/}
            <div inert={isDeleteModalOpen}>
                <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the file{" "}
                                <strong>{fileToDelete?.name}</strong>.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={closeDeleteModal}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteFile}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
