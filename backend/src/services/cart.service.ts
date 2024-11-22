import { CreateCartDto, CreateCartItemDto, GetCartDto, UpdateCartDto, UpdateCartItemDto } from "../controllers/@types/cart.dto";
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

    async delete(user_id: number) {
        return await cartDal.delete(user_id);
    }

    async getCount(id: number) {
        return await cartDal.getCount(id);
    }

    //

    async createItem(dto: CreateCartItemDto) {
        return await cartDal.createItem(dto);
    }

    async getAllItem(user_id: number) {
        return await cartDal.getAllItem(user_id);
    }

    async getOneItem(id: number) {
        return await cartDal.getOneItem(id);
    }

    async updateItem(dto: UpdateCartItemDto) {
        return await cartDal.updateItem(dto);
    }

    async deleteItem(id: number) {
        return await cartDal.deleteItem(id);
    }
}

const cartService = new CartService();
export default cartService;