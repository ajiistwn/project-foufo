// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: '/assets',
    },
];

const data: { section: string; items: { title: string; date: string; image: string; }[]; }[] = [
    {
    section: "Legal",
    items: [
        {
        title: "FFO_Data Crew",
        date: "February 4, 2025",
        image: "https://picsum.photos/60?random=1",
        },
    ],
    },
    {
    section: "IP Development",
    items: [
        {
        title: "FFO_Charachter UFO " ,
        date: "February 4, 2025",
        image: "https://picsum.photos/60?random=2",
        },
        {
        title: "FFO_Skoci Kecil UFO",
        date: "February 4, 2025",
        image: "https://picsum.photos/60?random=3",
        },
        {
        title: "FFO_Global Sinopsis",
        date: "February 7, 2025",
        image: "https://picsum.photos/60?random=4",
        },
        {
        title: "FFO_Scene Plot",
        date: "February 19, 2025",
        image: "https://picsum.photos/60?random=5",
        },
        {
        title: "FFO_Skenario_Draft 3a",
        date: "March 24, 2025",
        image: "https://picsum.photos/60?random=6",
        },
    ],
    },
    {
    section: "Pre Production",
    items: [
        {
        title: "FFO_Timeline",
        date: "",
        image: "https://picsum.photos/60?random=7",
        },
    ],
    },
  ];

export default function Assets() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assets" />
            <div className=" min-h-screen py-4 px-6 space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <Button className="bg-purple-600 text-white px-4 py-2 rounded-md  flex items-center">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                        </svg> */}
                        <span>Add Asets</span>
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

                {data.map((section, index) => (
                    <div key={index} className="space-y-2">
                        <h2 className="text-lg font-bold">{section.section}</h2>
                        {section.items.map((item, idx) => (
                            <Card key={idx} className=" flex flex-row justify-items-center py-0 gap-0 min-h-20 ">
                                <CardHeader className="w-30 p-0 rounded-sm overflow-hidden bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${item.image})` }}>
                                </CardHeader>
                                <CardContent className="px-0 ps-5 w-full flex flex-col justify-center">
                                    <h2 className="font-semibold text-m text-left">{item.title}</h2>
                                    <p className="text-xs text-left text-pink-500">{item.date}</p>
                                </CardContent>
                                < CardFooter className="px-2">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="w-5 h-5 " />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
