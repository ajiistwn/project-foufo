import '../css/app.css';

// import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Slide } from 'react-toastify';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import Preloader from '@/components/preloader';
// Import Toastify

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

interface FlashProps {
    success?: string;
    error?: string;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Pastikan props.flash sesuai dengan tipe FlashProps
        const flash = props.initialPage.props.flash as FlashProps;

       // Tampilkan notifikasi jika ada flash message
       if (flash?.success) {
            console.log('Success Message:', flash.success); // Debugging
            toast.success(flash.success);
        }

        if (flash?.error) {
            console.log('Error Message:', flash.error); // Debugging
            toast.error(flash.error);
        }


        root.render(
            <>
                <Preloader />
                <App {...props} />
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
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
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
