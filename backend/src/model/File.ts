import { Entity, Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Thread from './Thread';
import Reply from './Reply';

@Entity()
class File {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ nullable: true })
  url!: string

  @Column()
  extension!: string

  @Column({ nullable: true })
  threadId!: number

  @Column({ nullable: true })
  replyId!: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @ManyToOne(() => Thread, (thread) => thread.files)
  thread!: Thread;

  @ManyToOne(() => Reply, (reply) => reply.files)
  reply!: Reply;
}

export default File;
