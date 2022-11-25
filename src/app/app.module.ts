import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppReducers } from './tableros/store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from './tableros/store/effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(AppReducers),
        StoreDevtoolsModule.instrument({
            maxAge: 10,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot(EffectsArray),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
