import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'Pendiente',
})
export class PendientePipe implements PipeTransform {
    transform(value: boolean): string {
        if (value) {
            return 'Completado';
        }
        return 'Pendiente';
    }
}
