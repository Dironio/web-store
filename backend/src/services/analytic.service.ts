import analyticDal from "../data/analytic.dal";
import { CreateAnalyticDto, UpdateAnalyticDto } from "../controllers/@types/analytic.dto";


class AnalyticService {
    async create(dto: CreateAnalyticDto) {
        return await analyticDal.create(dto);
    }

    async getAll() {
        return await analyticDal.getAll();
    }

    async getOne(id: number) {
        return await analyticDal.getOne(id);
    }

    async update(dto: UpdateAnalyticDto) {
        return await analyticDal.update(dto);
    }

    async delete(id: number) {
        return await analyticDal.delete(id);
    }
}

const analyticService = new AnalyticService();
export default analyticService;