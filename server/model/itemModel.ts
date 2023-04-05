export interface Item{
    id?:number,
    user_id: number,
    name: string,
    description:string,
    price: number,
    item_image: string,
    tag: 'hat' | 'shirt' | 'pants' | 'shoes' |'other' ,
    createdAt?:Date,
    updatedAt?:Date,
}
