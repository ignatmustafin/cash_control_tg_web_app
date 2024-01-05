import {
    ObjectId,
    ObjectIdColumn,
    Column,
    PrimaryGeneratedColumn,
    Entity,
    OneToOne,
    JoinColumn,
    ManyToOne
} from "typeorm"
import {Category} from "./categories";

@Entity('expenses')
export class Expenses {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @Column()
    amount!: number;

    @Column({name: 'user_id'})
    userId!: number;

    @ManyToOne(() => Category)
    @JoinColumn({name: 'category_id'})
    category?: Category;
}
