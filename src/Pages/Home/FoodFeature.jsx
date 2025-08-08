import React from "react";
import { motion } from "framer-motion";

const foodItems = [
  {
    id: 1,
    name: "Sizzling BBQ Ribs",
    description: "Tender ribs glazed with smoky BBQ sauce, grilled to juicy perfection.",
    image:
      "https://i.postimg.cc/nr9cQMSP/alexandru-bogdan-ghita-Ue-Ykq-Qh4-Po-I-unsplash.jpg",
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "A refreshing blend of quinoa, cherry tomatoes, cucumbers, and feta cheese.",
    image:
      "https://i.postimg.cc/j2wn4XgR/caesar-salad.jpg",
  },
  {
    id: 3,
    name: "Decadent Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
    image:
      "https://i.postimg.cc/yxK1Gynm/Chocolate-Lava-Cake-Feature-1084x1536.jpg",
  },
  {
    id: 4,
    name: "Chicken Biryani",
    description: "Succulent shrimp sautéed in a spicy garlic sauce with fresh herbs.",
    image:
      "https://i.postimg.cc/T3GJqKbB/Chicken-Biryani-Recipe.jpg",
  },
];

const FoodFeature = () => {
  return (
    <section className="w-full py-16 px-6 transition-colors duration-500">
      {/* Center container */}
      <div className="max-w-[1280px] mx-auto">
        <motion.h2
          className="text-4xl font-bold text-yellow-500 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Foods
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {foodItems.map(({ id, name, description, image }) => (
            <motion.div
              key={id}
              className=" rounded-lg shadow-lg overflow-hidden flex flex-col transition-colors duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: id * 0.2 }}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-yellow-500">{name}</h3>
                <p className="text-lg flex-grow">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodFeature;
