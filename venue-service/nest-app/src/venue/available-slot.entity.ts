import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venue } from './venue.entity';

@Entity('available_slots')
export class AvailableSlot {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Venue, venue => venue.slots)
  @JoinColumn({ name: 'venue_id' })
  venue!: Venue;

  @Column()
  start_time!: Date;

  @Column()
  end_time!: Date;

  @Column({ default: true })
  is_available!: boolean;
}