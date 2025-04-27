import { Module } from '@nestjs/common';
import { Gateway } from './gateway.socket';
import { UserModule } from 'src/user/user.module';
import { MessageModule } from 'src/message/message.module';
import { GatewayService } from './services/gateway.service';

@Module({
    imports: [UserModule, MessageModule],
    providers: [Gateway, GatewayService]
})
export class GatewayModule {}
