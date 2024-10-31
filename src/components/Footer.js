import React from 'react'

export const Footer = () => {
    let year = new Date().getFullYear();
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full p-2 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} <a href="https://www.linkedin.com/in/melania-iftinchi-1b7b95172/" className="hover:underline">Melania</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="https://github.com/Melaniaift/Tasks-frontend" className="hover:underline me-4 md:me-6">Frontend</a>
                </li>
                <li>
                    <a href="https://github.com/Melaniaift/Tasks-backend" className="hover:underline me-4 md:me-6">Backend</a>
                </li>
            </ul>
        </footer>
    )
}


