import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AnimateModule } from 'primeng/animate';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [
        ButtonModule,
        DialogModule,
        AnimateModule,
        RippleModule,
        PaginatorModule,
        ConfirmDialogModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        MenuModule,
    ],
})
export class NgprimeModule {}
