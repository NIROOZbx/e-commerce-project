import { useState } from "react";
import { Star } from "lucide-react"; // or use any star icon lib

const FakeStars = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          size={20}
          className={i < rating ? `text-yellow-400  stroke-none ${rating>=3?`fill-[#22a800]`:`fill-[#fa240c]`}` : "text-gray-300"}
        />
      ))}
    </div>
  );
};
export default FakeStars