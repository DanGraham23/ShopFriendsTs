interface Item{
    id:number,
    description:string,
    price: number,
    itemImage: string,
    tag: 'hat' | 'shirt' | 'pants' | 'shoes' |'other' ,
    createdAt:Date,
    updatedAt:Date,
}
export {Item};