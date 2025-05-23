import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn"

interface GymCardProps {
  image: string;
  name: string;
  location: string;
}

const GymCard: React.FC<GymCardProps> = ({ image, name, location }) => (
  <Card className="w-80 shadow-lg rounded-lg overflow-hidden">
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
      <div className="flex items-center text-gray-600">
        <LocationOnIcon className="mr-1 text-blue-500" fontSize="small" />
        <Typography variant="body2">{location}</Typography>
      </div>
    </CardContent>
  </Card>
);

export default GymCard;