"use client";

import { useEffect, useState } from "react";
import ListCard from "@/app/components/listCard/ListCardGym";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Loading from "@/app/components/loading/Loading";
import { useGetAllProductsQuery } from "@/app/store/productApi";

const PAGE_SIZE = 10;

export default function Gyms() {
    const router = useRouter();
    const { email } = useSelector((state: RootState) => state.auth);
    const [checking, setChecking] = useState(true);
    const [page, setPage] = useState(0);
    const [allProducts, setAllProducts] = useState<any[]>([]);

    const { data: products, isLoading, error } = useGetAllProductsQuery({ limit: PAGE_SIZE, skip: page * PAGE_SIZE });

    useEffect(() => {
        if (email === null) {
            router.push("/")
        } else {
            setTimeout(() => setChecking(false), 2000);
        }
    }, [email, router]);

    // Empilha os produtos ao carregar mais
    useEffect(() => {
        if (products && products.length > 0) {
            setAllProducts((prev) => {
                // Evita duplicatas se voltar página
                const ids = new Set(prev.map(p => p.id));
                const novos = products.filter(p => !ids.has(p.id));
                return [...prev, ...novos];
            });
        }
    }, [products]);

    // Limpa ao deslogar ou sair da tela
    useEffect(() => {
        if (page === 0 && products && products.length > 0) {
            setAllProducts(products);
        } else if (page === 0) {
            setAllProducts([]);
        }
    }, [page, email, products]);

    if (checking) return <Loading />
    if (isLoading && allProducts.length === 0) return <Loading />
    if (error) return <p>Erro ao buscar academias.</p>;

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-4xl font-bold">Academias em destaque</h1>
            <ListCard products={allProducts} />

            {/* Botão Carregar mais */}
            <div className="flex gap-4 mt-8">
                <button
                    className="px-4 py-2 bg-white text-black rounded disabled:opacity-50"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!products || products.length < PAGE_SIZE}
                >
                    Carregar mais
                </button>
            </div>
        </div>
    );
}