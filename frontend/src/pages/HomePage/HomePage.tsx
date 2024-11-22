import { useContext } from "react";
import { UserContext } from "../../App";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import PromoOffers from "../../components/PromoOffers/PromoOffers";
import Products from "../../components/Products/Products";
import SpecialProducts from "../../components/SpecialProducts/SpecialProducts";


const HomePage: React.FC = () => {
    const user = useContext(UserContext);


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