import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMconfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMconfig),
    BoardsModule,
    AuthModule],

})
export class AppModule {}
