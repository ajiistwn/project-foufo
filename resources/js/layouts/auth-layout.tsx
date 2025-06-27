import AuthLayoutTemplate from '@/layouts/auth/auth-card-layout';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;

    useEffect(() => {
        if (flash?.success) {
            console.log('Success Message:', flash.success); // Debugging
            toast.success(flash.success);
        }
        if (flash?.error) {
            console.log('Error Message:', flash.error); // Debugging
            toast.error(flash.error);
        }
    }, [flash]);

    return (
    <>
        <AuthLayoutTemplate title={title} description={description} {...props}>
            {children}
        </AuthLayoutTemplate>
       <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
        />
    </>
    );
}
