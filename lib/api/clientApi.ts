import { nextServer } from './api'
import { AllCars, CarQueryParams, Car} from '@/types/car';

export const getCars = async ({ page, limit, brand, rentalPrice, minMileage, maxMileage }: CarQueryParams): Promise<AllCars> => {
    const params: {
        page: number;
        limit: number;
        brand?: string;
        rentalPrice?: string;
        minMileage?: number;
        maxMileage?: number;
    } = { page, limit };

    if (brand) params.brand = brand;
    if (rentalPrice) params.rentalPrice
 = rentalPrice;
    if (minMileage && minMileage.trim() !== '') params.minMileage = Number(minMileage);
    if (maxMileage && maxMileage.trim() !== '') params.maxMileage = Number(maxMileage);

    try {
        const res = await nextServer.get<AllCars>('/cars', {params})
        return res.data;
    } catch {
        throw new Error ('Failed to load cars. Please ensure your connection and try again')
    }
}

export const getOneCar = async (id: string): Promise<Car> => {
    try {
        const res = await nextServer.get<Car>(`/cars/${id}`)
        return res.data;
    } catch {
        throw new Error('Failed to load the car. Please ensure your connection and try again');
    }
}