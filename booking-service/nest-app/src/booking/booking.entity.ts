import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Venue } from './venue.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Venue)
  @JoinColumn({ name: 'venue_id' })
  venue!: Venue;

  @Column()
  start_time!: Date;

  @Column()
  end_time!: Date;

  @Column({ default: 'confirmed' })
  status!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}