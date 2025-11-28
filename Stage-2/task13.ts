// This enables module augmentation mode.
import 'date-wizard';

declare module 'date-wizard' {
    // Дополняем интерфейс DateDetails
    interface DateDetails {
        hours: number;
        minutes: number; 
        seconds: number;
    }

    // Объявляем функцию pad
    function pad(s: number): string;
}

