import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    async hello(): Promise<string> {
        return 'Hello from BoardsService';
    }
}
