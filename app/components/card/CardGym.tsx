"use client";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ThumbUpAltIcon from "@mui/icons-material/FitnessCenter";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { toggleFavorite, toggleLike, addComment } from "./CardGymSlice";

interface GymCardProps {
  image: string;
  name: string;
  location: string;
  id: string;
}

export default function GymCard ({ image, name, location, id }: GymCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isFavorite = useSelector((state: RootState) => state.card.favorites.includes(id));
  const isLiked = useSelector((state: RootState) => state.card.likes.includes(id));
  const comments = useSelector((state: RootState) => state.card.comments[id] || []);

  // Modal state
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(
        addComment({
          gymId: id,
          comment: { id: Date.now(), user: "Você", text: comment },
        })
      );
      setComment("");
    }
  };

  return (
    <Card className="w-80 h-[420px] shadow-lg rounded-lg overflow-hidden relative flex flex-col">
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
        image={image}
        alt={name}
        className="object-cover w-full h-48"
      />
      <CardContent className="bg-white flex-1 flex flex-col justify-between">
        <div>
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
        </div>
        {/* Like e comentários fixos na parte de baixo */}
        <div className="flex items-center gap-4 mt-4 pt-2 border-t border-gray-100">
          <IconButton
            onClick={() => dispatch(toggleLike(id))}
            aria-label="Curtir"
            size="small"
          >
            <ThumbUpAltIcon className={isLiked ? "text-blue-600" : "text-gray-400"} />
          </IconButton>
          <IconButton aria-label="Comentários" size="small" onClick={handleOpen}>
            <ChatBubbleOutlineIcon className="text-gray-500" />
          </IconButton>
        </div>
      </CardContent>
      {/* Modal de comentários */}
      <Modal open={open} onClose={handleClose}>
        <Box
          className="absolute left-1/2 top-1/2 bg-white rounded-lg shadow-lg p-6"
          sx={{
            minWidth: 320,
            maxWidth: 400,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" className="mb-4 font-bold">
            Comentários
          </Typography>
          <div className="max-h-48 overflow-y-auto mb-4">
            {comments.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Nenhum comentário ainda.
              </Typography>
            )}
            {comments.map((c) => (
              <div key={c.id} className="mb-2">
                <span className="font-semibold">{c.user}: </span>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <TextField
              size="small"
              fullWidth
              placeholder="Escreva um comentário..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit" variant="contained" disabled={!comment.trim()}>
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
    </Card>
  );
};
