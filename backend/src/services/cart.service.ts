import { CreateCartDto } from "../controllers/@types/cart.dto";
import cartDal from "../data/cart.dal";


class CartService {
    async create(dto: CreateCartDto) {
        return await cartDal.create(dto);
    }

    async getAll(dto:) {
        return await cartDal.getAll(dto);
    }

    async getOne(dto:) {
        return await cartDal.getOne(id);
    }

    async update(dto:) {
        return await cartDal.update();
    }

    async delete(dto:) {
        return await cartDal.delete();
    }
}

const cartService = new CartService();
export default cartService;