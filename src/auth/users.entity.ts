import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./users-role.enum";
import { Board } from "src/boards/boards.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column()
    role: UserRole;

    @OneToMany(Type => Board, board => board.author, { eager: false })
    boards: Board[];
}