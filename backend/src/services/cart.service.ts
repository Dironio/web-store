import { CreateCartDto, GetCartDto, UpdateCartDto } from "../controllers/@types/cart.dto";
import cartDal from "../data/cart.dal";


class CartService {
    async create(dto: CreateCartDto) {
        return await cartDal.create(dto);
    }

    async getAll() {
        return await cartDal.getAll();
    }

    async getOne(id: number) {
        return await cartDal.getOne(id);
    }

    async update(dto: UpdateCartDto) {
        return await cartDal.update(dto);
    }

    async delete(id: number) {
        return await cartDal.delete(id);
    }
}

const cartService = new CartService();
export default cartService;