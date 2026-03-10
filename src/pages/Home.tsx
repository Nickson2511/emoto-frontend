import React from "react"
import HeroBanner from "../shared/components/HeroBanner"
import FeaturedCategories from "../shared/components/FeaturedCategories"
import FlashDeals from "../shared/components/FlashDeals"
import TopDeals from "../shared/components/TopDeals"
import ProductsGrid from "../shared/components/ProductsGrid"



const Home: React.FC = () => {
    return (
        <div className="p-6">

            <HeroBanner />
            <FeaturedCategories />
            <FlashDeals />
            <TopDeals />
            <ProductsGrid />


        </div>

    )
}

export default Home
