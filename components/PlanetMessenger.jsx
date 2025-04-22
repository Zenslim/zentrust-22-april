
import { useState, useEffect } from "react";

export default function PlanetMessenger({ message, onClick }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    const hideTimer = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [message]);

  const handleClick = () => {
    if (onClick) onClick(message);
  };

  const dynamicClasses = `transition-all duration-500 ease-in-out ${
    visible ? "opacity-100 scale-125" : "opacity-0 scale-75"
  } w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-center text-lg shadow-lg`;

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      onClick={handleClick}
    >
      <div className={dynamicClasses}>
        {message}
      </div>
    </div>
  );
}
