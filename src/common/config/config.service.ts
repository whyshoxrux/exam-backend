import { Injectable } from "@nestjs/common";
import * as dotenv from 'dotenv'

@Injectable()
export class ConfigService{
    constructor(){
        dotenv.config()
    }
    get(name){
        return process.env[name]
    }
}