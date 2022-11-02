export interface ICard {
    data: string,
    'background-color': string,
    date: Date | string,
    colorAsId: string,
    id:number
}
export interface ILastChangeCard {
    card: ICard,
    index: number
}