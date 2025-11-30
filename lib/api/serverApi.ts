import { nextServer } from './api'
import { Car } from '@/types/car';


export const getOneCarServer = async (id: string): Promise<Car> => {
    try {
        const res = await nextServer.get<Car>(`/cars/${id}`)
        return res.data;
    } catch {
        throw new Error('Failed to load the car. Please ensure your connection and try again');
    }
}