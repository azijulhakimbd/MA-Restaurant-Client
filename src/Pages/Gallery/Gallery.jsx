import { useEffect, useState, useRef, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ITEMS_PER_PAGE = 12;

const Gallery = () => {
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const observer = useRef();

  const lastImageRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/foods`)
      .then((res) => res.json())
      .then((data) => {
        const newItems = data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
        setFoods((prev) => [...prev, ...newItems]);
        setHasMore(newItems.length === ITEMS_PER_PAGE);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading foods:", error);
        setLoading(false);
      });
  }, [page]);

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
        {foods.map((food, i) => {
          const isLast = i === foods.length - 1;
          return (
            <div
              key={food._id}
              ref={isLast ? lastImageRef : null}
              onClick={() => handleClick(i)}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover rounded-lg border dark:border-gray-700 opacity-0 animate-fadeIn"
                onLoad={(e) => e.target.classList.remove("opacity-0")}
              />
            </div>
          );
        })}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <p className="text-center my-4 text-gray-500 animate-pulse">Loading more...</p>
      )}

      {/* Lightbox */}
      <Lightbox open={open} close={() => setOpen(false)} index={index} slides={slides} />
    </div>
  );
};

export default Gallery;
