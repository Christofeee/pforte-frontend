"use client"

import { Button } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";

export default function BackButton() {

    const router = useRouter()

    const handleOnclick = () => {
        router.back()
    }
    return (
        <Button onClick={handleOnclick}>
            <ArrowBackIos />
        </Button>
    )
}