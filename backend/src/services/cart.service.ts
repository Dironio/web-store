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

    //

    async createItem(dto: CreateCartDto) {
        return await cartDal.createItem(dto);
    }

    async getAllItem() {
        return await cartDal.getAllItem();
    }

    async getOneItem(id: number) {
        return await cartDal.getOneItem(id);
    }

    async updateItem(dto: CreateCartDto) {
        return await cartDal.updateItem(dto);
    }

    async deleteItem(id: number) {
        return await cartDal.deleteItem(id);
    }
}

const cartService = new CartService();
export default cartService;