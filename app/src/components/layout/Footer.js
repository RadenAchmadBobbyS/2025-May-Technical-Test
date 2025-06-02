

export default function Footer() {

    return (
        <footer className="bg-white mt-10 border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Wisata App. All rights reserved.
            </p>
            </div>
        </div>
        </footer>
    );
}