import { useContext } from "react";
// import { UserContext } from "../../App";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import PromoOffers from "../../components/PromoOffers/PromoOffers";
import Products from "../../components/Products/Products";
import SpecialProducts from "../../components/SpecialProducts/SpecialProducts";
import { User } from "../../App";

interface HomePageProps {
    user: User | null;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
    return (
        <div>
            <FeaturedProducts />
            <PromoOffers />
            <SpecialProducts user={user} />
            <Products />
        </div>
    );
};


export default HomePage;