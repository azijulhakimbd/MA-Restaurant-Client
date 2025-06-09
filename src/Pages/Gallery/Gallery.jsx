import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; 

const Gallery = () => {
  const [foods, setFoods] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((error) => console.error("Error loading foods:", error));
  }, []);

  const slides = foods.map((food) => ({
    src: food.image,
  }));

  const handleClick = (i) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div>
      {/* Title Section */}
      <div className="bg-gradient-to-r from-yellow-400 to-pink-500 dark:from-yellow-600 dark:to-pink-700 h-60 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">Food Gallery</h1>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food, i) => (
          <div
            key={food._id}
            onClick={() => handleClick(i)}
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={food.image}
              alt=""
              className="w-full h-48 object-cover rounded-lg border dark:border-gray-700"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </div>
  );
};

export default Gallery;
