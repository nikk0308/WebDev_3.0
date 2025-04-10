import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
//import { Booking } from './booking/booking.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
  //
  // @OneToMany(() => Booking, booking => booking.id)
  // bookings!: Booking[];
}