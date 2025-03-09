import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable({scope:Scope.REQUEST})
export class EncryptionService {
  private readonly algorithm:string;
  private readonly key:Buffer<ArrayBuffer>;
  private readonly iv:Buffer<ArrayBuffer>;

  constructor(private readonly configService:ConfigService)
  {
    this.algorithm = this.configService.getOrThrow<string>("ALGORITHM")
    this.key = Buffer.from(this.configService.getOrThrow<string>("ENCRYPT_SECRET_KEY"), 'hex');
    this.iv = Buffer.from(this.configService.getOrThrow<string>("ENCRYPT_IV"), 'hex');
  }

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
