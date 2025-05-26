"use client";

import { useEffect, useState } from "react";
import ListCard from "@/app/components/listCard/ListCardGym";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Loading from "@/app/components/loading/Loading";
import { useGetAllProductsQuery } from "@/app/store/productApi";

export default function Gyms() {

    const router = useRouter();
    const { email } = useSelector((state: RootState) => state.auth);
    const [checking, setChecking] = useState(true);
    const { data: products, isLoading, error } = useGetAllProductsQuery(10);

    useEffect(() => {
        if (email === null) {
            router.push("/")
        } else {
            setTimeout(() => setChecking(false), 2000);
        }
    }, [email, router]);

    if (checking) return <Loading />
    if (isLoading) return <Loading />
      if (error) return <p>Erro ao buscar academias.</p>;


    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-4xl font-bold">Academias em destaque</h1>

            <ListCard products={products || []} />
        </div>
    );
}