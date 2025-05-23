"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ThumbUpAltIcon from "@mui/icons-material/FitnessCenter"; // Usando FitnessCenter como "braço"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { toggleFavorite, toggleLike } from "./CardSlice";

interface GymCardProps {
  image: string;
  name: string;
  location: string;
  id: string;
}

const GymCard: React.FC<GymCardProps> = ({ image, name, location, id }) => {
  const dispatch: AppDispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => state.card.favorites.includes(id));
  const isLiked = useSelector((state: RootState) => state.card.likes.includes(id));

  return (
    <Card className="w-80 shadow-lg rounded-lg overflow-hidden relative">
      {/* Botão de favorito no canto superior direito */}
      <IconButton
        className="absolute top-2 right-2 bg-white/80 hover:bg-white z-10"
        onClick={() => dispatch(toggleFavorite(id))}
        aria-label="Favoritar"
        size="small"
      >
        {isFavorite ? (
          <StarIcon className="text-yellow-400" />
        ) : (
          <StarBorderIcon className="text-yellow-400" />
        )}
      </IconButton>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={name}
        className="object-cover"
      />
      <CardContent className="bg-white">
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="font-bold text-gray-800"
        >
          {name}
        </Typography>
        <div className="flex items-center text-gray-600 mb-2">
          <LocationOnIcon className="mr-1 text-blue-500" fontSize="small" />
          <Typography variant="body2">{location}</Typography>
        </div>
        <div className="flex items-center gap-4 mt-2">
          {/* Botão de like */}
          <IconButton
            onClick={() => dispatch(toggleLike(id))}
            aria-label="Curtir"
            size="small"
          >
            <ThumbUpAltIcon className={isLiked ? "text-blue-600" : "text-gray-400"} />
          </IconButton>
          {/* Botão de comentários */}
          <IconButton aria-label="Comentários" size="small">
            <ChatBubbleOutlineIcon className="text-gray-500" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default GymCard;