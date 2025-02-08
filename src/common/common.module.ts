import { Module } from '@nestjs/common';
import { CommonResolver } from './common.resolver';
import { CommonService } from './common.service';

@Module({
  providers: [CommonResolver, CommonService],
  exports: [CommonResolver, CommonService]
})
export class CommonModule {}
