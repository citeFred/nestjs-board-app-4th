import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./boards-status.enum";
import { User } from "src/auth/users.entity";

@Entity()
export class Board {
    @PrimaryGeneratedColumn() // PK + Auto Increment
    id: number;

    @Column() // General Column
    author: string;

    @Column()
    title: string;

    @Column()
    contents: string;

    @Column()
    status: BoardStatus

    @ManyToOne(Type => User, user => user.boards, { eager: false})
    user: User;
}