import { Module } from '@nestjs/common';
import { Gateway } from './gateway.socket';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule],
    providers: [Gateway]
})
export class GatewayModule {}
