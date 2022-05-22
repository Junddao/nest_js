import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService : BoardsService){}

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() CreateBoardDto : CreateBoardDto,
        @GetUser() user:User
    ): Promise<Board>{
        return this.boardsService.createBoard(CreateBoardDto, user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
        ): Promise<void>{
        return this.boardsService.deleteBoard(id, user);
    }

    @Patch('/:id/status')
    updateBoard(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ){
        return this.boardsService.updateBoardStatus(id, status);

    }

    @Get()
    getAllBoards(
        @GetUser() user:User
    ) : Promise<Board[]> {
        return this.boardsService.getAllBoards(user);
    }
}
