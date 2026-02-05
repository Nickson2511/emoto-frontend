import React from "react"
import HeroBanner from "../shared/components/HeroBanner"
import FeaturedCategories from "../shared/components/FeaturedCategories"
import FlashDeals from "../shared/components/FlashDeals"
import TopDeals from "../shared/components/TopDeals"



const Home: React.FC = () => {
    return (
        <div className="p-6">

            <HeroBanner />
            <FeaturedCategories />
            <FlashDeals />
            <TopDeals />




        </div>
    )
}

export default Home
