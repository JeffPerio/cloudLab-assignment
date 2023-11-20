import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

    keyList: string[] = [];

    storeFile(file: File, fileKey: string): void {
        const reader = new FileReader();

        reader.onload = (event: any) => {
            const base64Data = event.target.result;
            localStorage.setItem(fileKey, base64Data);
        };
        reader.readAsDataURL(file);
        this.keyList.push(fileKey);
    }

    getStoredFile(fileKey: string): string {
        let stringRes = localStorage.getItem(fileKey);
        return stringRes ?? '';
    }

    clearStoredFile(): void {
        this.keyList.forEach(key => {
            localStorage.removeItem(key);
        });
        
    }
}
