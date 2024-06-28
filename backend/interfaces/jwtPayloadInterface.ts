import { ObjectId } from "mongoose"
export default interface JwtPayload {
    userId: ObjectId
}