import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Pages from "./Page";

@Entity()
class Sections extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  head: string;

  @Column({ nullable: true})
  isCard: boolean;

  @Column({ nullable: true})
  divisor: boolean;

  @Column({ nullable: true})
  icon: string;

  @Column({ nullable: true})
  title: string;

  @Column({ nullable: true})
  subtitle: string;

  @Column({ nullable: true})
  paragraph:string;

  @Column({ nullable: true})
  phrase: string;

  @Column({ nullable: true})
  code: string;

  @ManyToOne((type) => Pages)
  @JoinColumn()
  page: Pages;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Sections;
