import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { CreateVenueDto } from './dto/create-venue.dto';

@Injectable()
export class VenueService {

  constructor(@Inject('VENUE_SERVICE') private readonly venueClient: ClientProxy,) {
  }

  private readonly logger = new Logger(VenueService.name);

  private async send(pattern: any, data: any): Promise<any> {
    if (!pattern) {
      throw new Error('Pattern is undefined!');
    }

    this.logger.log(`Sending message: pattern=${JSON.stringify(pattern)}, data=${JSON.stringify(data)}`);

    const res$ = this.venueClient.send(pattern, data).pipe(
      timeout(30000),
      catchError((e: Error) => {
        this.logger.error(`Error while sending message: ${e.message}`);
        return throwError(() => e);
      })
    );

    try {
      const result = await firstValueFrom(res$);
      if (result === undefined || result === null) {
        this.logger.warn(`Received empty response for pattern: ${pattern}`);
        return null;
      }
      return result;
    } catch (e) {
      if (e.message.includes('no elements in sequence')) {
        this.logger.warn(`No elements in sequence for pattern: ${pattern}`);
        return null;
      }
      throw e;
    }
  }

  public async create(createVenueDto: CreateVenueDto){
    return this.send('create', createVenueDto);
  }

  public async findAll(){
    return this.send('findAll', {});
  }

  public async findSlots(id: string){
    return this.send('findSlots', id);
  }

  public async findById(id: string) {
    return this.send('find_venue_by_id', { id });
  }

  public async hello(){
    return this.send('hello', 'hello');
  }
}
