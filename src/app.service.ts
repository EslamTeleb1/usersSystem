import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
    async onApplicationBootstrap() {
        console.log('Seeding Data');
      }
}
