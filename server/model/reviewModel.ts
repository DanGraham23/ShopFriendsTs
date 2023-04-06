export interface Review{
    id? : number,
    receiver_user_id: number,
    sender_user_id: number,
    rating: number,
    created_at?: Date,
    updated_at?: Date
}