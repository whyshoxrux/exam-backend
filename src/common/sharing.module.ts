import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config/config.service";

@Global()
@Module({
    providers: [ConfigService],
    exports: [ConfigService]
})

export class SharingModule{}