import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';



@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository){};

    async createBoard(createBoardDto : CreateBoardDto, user: User) : Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id:number) : Promise <Board> {
        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`can't found id ${id}` );
        }
        return found;
    }

    async deleteBoard(id: number, user: User) : Promise<void>{
        const result = await this.boardRepository.delete({id, user});
        if(result.affected === 0){
            throw new NotFoundException(`can't find id ${id}`);
        }
        console.log(result)
    }

    async updateBoardStatus(id: number, status : BoardStatus): Promise<Board>{
        const board = await this.getBoardById(id);
        board.status = status;
        this.boardRepository.save(board);
        return board;

    }

    async getAllBoards(user: User) : Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', {userId: user.id});
        const boards = await query.getMany();


        return boards;
    }

}
