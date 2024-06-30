
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({required: true, type: Types.ObjectId})
    userId: Types.ObjectId;

    @Prop({required: true})
    category: string;

    @Prop({required: true})
    status: string;

    @Prop({required: true})
    deadline: Date
}


export const TaskSchema = SchemaFactory.createForClass(Task);
