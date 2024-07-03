'use client';
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


function Addmember() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="add-user-4" transform="translate(-2 -2)">
                <path
                    id="secondary"
                    fill="#2ca9bc"
                    d="M14.84,13.61a6,6,0,0,1-7.68,0A7,7,0,0,0,3,20a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,7,7,0,0,0-4.16-6.39Z"
                />
                <path
                    id="primary"
                    d="M21,9H17m2,2V7"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
                <path
                    id="primary-2"
                    d="M15.46,13a6,6,0,1,1,0-8"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
                <path
                    id="primary-3"
                    d="M7,13.69A7,7,0,0,0,3,20a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1,7,7,0,0,0-4-6.33"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </g>
        </svg>
    );
}

export default Addmember;
