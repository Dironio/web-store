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

    // Добавление товара
    async addItemToCart(userId: number, productId: number) {
        const cartId = await cartDal.getCartIdByUserId(userId);
        if (!cartId) {
            throw new Error('Корзина не найдена');
        }
        return await cartDal.addItemToCart(cartId, productId);
    }

    async getCartTotalItems(userId: number) {
        const cartId = await cartDal.getCartIdByUserId(userId);
        if (!cartId) {
            throw new Error('Корзина не найдена');
        }
        return await cartDal.getTotalItemsInCart(cartId);
    }

    // Получение списка товаров
    async getCartItems(userId: number) {
        const cartId = await cartDal.getCartIdByUserId(userId);
        if (!cartId) {
            throw new Error('Корзина не найдена');
        }
        return await cartDal.getItemsInCart(cartId);
    }

    // Удаление товара
    async removeItemFromCart(userId: number, productId: number) {
        await cartDal.getCartIdByUserId(userId);

        if (!userId) {
            throw new Error('Корзина не найдена');
        }

        return await cartDal.removeItemFromCart(userId, productId);
    }

    // Удаление корзины при удалении пользователя
    async deleteCartByUserId(userId: number) {
        const cart = await cartDal.deleteCartByUserId(userId);
        if (!cart) {
            throw new Error('Корзина не найдена для удаления');
        }
        return cart;
    }




    async getCartItemsByUserId(userId: number) {
        return await cartDal.getCartItemsByUserId(userId);
    }
}

const cartService = new CartService();
export default cartService;