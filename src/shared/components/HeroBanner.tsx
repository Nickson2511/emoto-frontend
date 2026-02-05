import React, { useEffect, useState } from "react";

const images = [
    "/banner/hero-bike.jpg",
    "/banner/hero2.jpg",
    "/banner/hero3.jpg",
    "/banner/hero4.jpg",
    "/banner/hero5.jpeg",
    "/banner/hero6.jpeg",
    "/banner/hero7.jpeg",
    "/banner/hero8.jpg",
    "/banner/hero9.jpeg",
    "/banner/hero10.jpeg",
];

const HeroBanner: React.FC = () => {
    // Track which image is currently shown
    const [currentIndex, setCurrentIndex] = useState(0);

    // Change image every 0 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full bg-gray-100">
            {/* Centered container like Jumia */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div
                    className="relative h-[180px] sm:h-[260px] md:h-[340px] rounded-xl overflow-hidden transition-all duration-700"
                    style={{
                        backgroundImage: `url('${images[currentIndex]}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 text-white">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-xl">
                            Genuine Motorbike Spare Parts
                        </h1>

                        <p className="mt-2 text-sm sm:text-base max-w-lg">
                            Find engines, brakes, electrical parts and more at the best prices.
                        </p>

                        <button className="mt-4 w-fit bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-2 rounded-md text-sm sm:text-base">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
