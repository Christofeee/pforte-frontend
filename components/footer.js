"use client"
import React from 'react';

const footerNavs = [
    {
        href: '',
        name: 'About'
    },
    {
        href: '',
        name: 'Blog'
    },
    {
        href: '',
        name: ''
    },
    {
        href: '',
        name: 'Team'
    },
    {
        href: '',
        name: 'Careers'
    },
    {
        href: '',
        name: 'Support'
    }
];

function Footer() {
    return (
        <footer className="text-gray-500 bg-white px-4 py-5 mx-auto md:px-8" style={{ backgroundColor: '#6a5bcd', color: 'white', textShadow: "0px 0px .1rem black"}}>
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <img src="https://www.floatui.com/logo.svg" className="w-32 sm:mx-auto" />
                <p className="leading-relaxed mt-2 text-[15px]">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {footerNavs.map((item, index) => (
                    <li key={index + 1} className=" hover:text-gray-800">  {/* Key using index + 1 */}
                        <a href={item.href}>{item.name}</a>
                    </li>
                ))}
            </ul>
            <div className="mt-8 items-center justify-between sm:flex">
                {/* Rest of your footer content remains unchanged */}
            </div>
            <style jsx>{`
        .svg-icon path,
        .svg-icon polygon,
        .svg-icon rect {
          fill: currentColor;
        }
      `}</style>
        </footer>
    );
}

export default Footer;
