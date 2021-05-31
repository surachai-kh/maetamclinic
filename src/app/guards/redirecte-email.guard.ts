import { emailVerified } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

//ตรวจสอบการยืนยัน อีเมล์
export const redirectEmailVerified = (redirectURL: [any]) => {
    return pipe(emailVerified, map(status => status || redirectURL))
};