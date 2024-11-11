import productDal from "../data/product.dal"


class ProductService {
    async create(dto:) {
        return await productDal.create(dto);
    }

    async getAll(dto:) {
        return await productDal.getAll(dto);
    }

    async getOne(dto:) {
        return await productDal.getOne(id);
    }

    async update(dto:) {
        return await productDal.update();
    }

    async delete(dto:) {
        return await productDal.delete();
    }
}

const productService = new ProductService();
export default productService;