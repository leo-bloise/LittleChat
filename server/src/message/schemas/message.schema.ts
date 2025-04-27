import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/schemas/user.schema";

@Schema()
export class Message {
    @Prop({
        require: true
    })
    message: string;
    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    })
    user: User
}

export const MessageSchema = SchemaFactory.createForClass(Message);