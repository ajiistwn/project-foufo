// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@headlessui/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Updated',
        href: '/updated',
    },
];
const meetings = [
    {
        id: 1,
        title: "Shooting - Day 17",
        date: "June 21, 2025 at 8:00 AM",
        image: "https://picsum.photos/300/200",  // Gambar acak dari Picsum
        type: "PRODUCTION",
    },
    {
        id: 2,
        title: "Shooting - Day 16",
        date: "June 20, 2025 at 7:30 AM",
        image: "https://picsum.photos/300/200?random=1", // Tambahkan ?random=x untuk variasi gambar
        type: "PRODUCTION",
    },
    {
        id: 3,
        title: "Shooting - Day 15",
        date: "June 19, 2025 at 7:30 AM",
        image: "https://picsum.photos/300/200?random=2",
        type: "PRODUCTION",
    },
    {
        id: 4,
        title: "Shooting - Day 14",
        date: "June 18, 2025 at 7:30 AM",
        image: "https://picsum.photos/300/200?random=3",
        type: "PRODUCTION",
    },
    {
        id: 5,
        title: "Reading & Fitting Talent Surabaya",
        date: "June 17, 2025 at 12:00 PM",
        image: "https://picsum.photos/300/200?random=4",
        type: "PRODUCTION",
    },
    {
        id: 6,
        title: "Shooting - Day 13 - Pending Scene",
        date: "June 15, 2025 at 7:30 PM",
        image: "https://picsum.photos/300/200?random=5",
        type: "PRODUCTION",
    },
    {
        id: 7,
        title: "Shooting - Day 12",
        date: "June 14, 2025 at 6:30 PM",
        image: "https://picsum.photos/300/200?random=6",
        type: "PRODUCTION",
    },
    {
        id: 8,
        title: "Shooting - Day 11",
        date: "June 13, 2025 at 8:30 AM",
        image: "https://picsum.photos/300/200?random=7",
        type: "PRODUCTION",
    },
];

export default function Updated() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Updated" />
            <div className="min-h-screen p-4">
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
                <div className="flex w-full gap-2">
                    <input
                        type="text"
                        placeholder="Search"
                        className=" px-2 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-600 border-2 w-[60%]"
                    />
                    <select className=" px-2 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-600 border-2 w-[40%]" >
                        <option value="">Filter</option>
                        <option value="production">Production</option>
                        <option value="post-production">Post-Production</option>
                    </select>


                </div>

                {/* Month Title */}
                <h2 className="text-xl font-bold mb-4">June 2025</h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
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
                </div>

                {/* Footer Navigation */}

             </div>

            {/* <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div> */}
        </AppLayout>
    );
}
