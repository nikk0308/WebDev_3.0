import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AvailableSlot } from './available-slot.entity';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  location!: string;

  @Column()
  type!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @OneToMany(() => AvailableSlot, (slot) => slot.venue, { cascade: true, onDelete: 'CASCADE' })
  slots!: AvailableSlot[];
}