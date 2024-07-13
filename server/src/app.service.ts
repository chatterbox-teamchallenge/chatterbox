import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    constructor() { }

    async returnRoot() {
        return 'Chat API v1.1.1'
    }
}
