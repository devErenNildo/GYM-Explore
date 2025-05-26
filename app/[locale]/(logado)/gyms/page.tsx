"use client";

import { useEffect, useState } from "react";
import ListCard from "@/app/components/listCard/ListCardGym";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import gyms from "@/data/academias.json"
import Loading from "@/app/components/loading/Loading";

export default function Gyms() {

    const router = useRouter();
    const { name, email, picture } = useSelector((state: RootState) => state.auth);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (name === null) {
            router.push("/")
        } else {
            setTimeout(() => setChecking(false), 2000);
        }
    }, [name, router]);

    if (checking) return <Loading />


    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Academias em destaque</h1>

            <ListCard gyms={gyms} />
        </div>
    );
}