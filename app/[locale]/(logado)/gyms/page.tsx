import React from "react";
import ListCard from "@/app/components/listCard/ListCardGym";
import gyms from "@/data/academias.json"

export default function Gyms() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Academias em destaque</h1>

            <ListCard gyms={gyms} />
        </div>
    );
}