import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StudentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
