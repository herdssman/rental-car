import { nextServer } from './api'
import { AllCars, CarQueryParams, Car} from '@/types/car';

export const getCars = async ({ page, limit, brand, rentalPrice, minMileage, maxMileage }: CarQueryParams): Promise<AllCars> => {
    const params = {
        page,
        limit,
        ...(brand && { brand }),
        ...(rentalPrice && { rentalPrice }),
        ...(minMileage && minMileage.trim() !== '' && { minMileage: Number(minMileage) }),
        ...(maxMileage && maxMileage.trim() !== '' && { maxMileage: Number(maxMileage) }),
    };

    console.log('API Request params:', params); // Check what's being sent

    try {
        const res = await nextServer.get<AllCars>('/cars', { params });
        console.log('API Response:', res.data); // Check what comes back
        return res.data;
    } catch {
        throw new Error('Failed to load cars. Please ensure your connection and try again');
    }
};
export const getOneCar = async (id: string): Promise<Car> => {
    try {
        const res = await nextServer.get<Car>(`/cars/${id}`)
        return res.data;
    } catch {
        throw new Error('Failed to load the car. Please ensure your connection and try again');
    }
}