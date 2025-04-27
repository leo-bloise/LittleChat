import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { UserModule } from 'src/user/user.module';
import { MessageService } from './services/message.service';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([
            {
                name: Message.name,
                schema: MessageSchema
            }
        ])
    ],
    providers: [
        MessageService
    ],
    exports: [
        MessageService
    ]
})
export class MessageModule {}
