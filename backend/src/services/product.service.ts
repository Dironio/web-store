import productDal from "../data/product.dal"
import { CreateProductDto, GetProductDto, Product, UpdateProductDto } from "../controllers/@types/product.dto";


class ProductService {
    async create(dto: CreateProductDto): Promise<Product> {
        return await productDal.create(dto);
    }

    async getAll(dto: GetProductDto): Promise<Product[]> {
        return await productDal.getAll(dto);
    }

    async getOne(id: number): Promise<Product> {
        return await productDal.getOne(id);
    }

    async update(dto: UpdateProductDto): Promise<Product> {
        return await productDal.update(dto);
    }

    async delete(id: number): Promise<Product> {
        return await productDal.delete(id);
    }

    async getDiscount(): Promise<Product[]> {
        return await productDal.getDiscount();
    }
}

const productService = new ProductService();
export default productService;