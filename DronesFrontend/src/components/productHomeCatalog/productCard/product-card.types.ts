export interface ProductCardProps{
    id: number
    name: string,
    price: number
    image: string,
    discount?: number | null
}