"use client"
import React from 'react';

function Footer() {
    return (
        <footer className="bg-[#6a5bcd] text-white px-4 py-10 mx-auto text-center" style={{ textShadow: "0px 0px .1rem black" }}>
            <div className="max-w-xl mx-auto">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Developed by Zin Phyo Min. Final Year Internship Project. (LAP)
                </p>
            </div>
        </footer>
    );
}

export default Footer;
