"use client";
import React from "react";
import GymCard from "../card/CardGym";

interface Gym {
  id: string;
  image: string;
  name: string;
  location: string;
}

interface ListCardProps {
  gyms: Gym[];
}

const ListCard: React.FC<ListCardProps> = ({ gyms }) => (
  <div className="flex flex-wrap gap-6 justify-center">
    {gyms.map(gym => (
      <GymCard
        key={gym.id}
        id={gym.id}
        image={gym.image}
        name={gym.name}
        location={gym.location}
      />
    ))}
  </div>
);

export default ListCard;