import Image from "next/image";
import GymCard from "../components/card/Card";
import ListCard from "../components/listCard/ListCard";

export default function Home() {
  const gyms = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=400&q=80",
      name: "Academia Exemplo 1",
      location: "Rua das Flores, 123",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      name: "Academia Exemplo 2",
      location: "Av. Brasil, 456",
    },
  ];
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>teste</h1>


      <ListCard gyms={gyms} />
    </div>
  );
}
