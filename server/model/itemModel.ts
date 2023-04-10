export interface Item{
    id?:number,
    user_id: number,
    name: string,
    description:string,
    price: number,
    item_image: string,
    tag: 'hat' | 'shirt' | 'pants' | 'shoes' |'other' ,
    username?: string,
    profile_picture?: string,
    created_at?:Date,
    updated_at?:Date,
}
