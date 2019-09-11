import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import {AuthEffectsService} from './store/effects/auth-effects.service';
import {FormlyModule} from '@ngx-formly/core';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app-states';
import {SharedModule} from './shared/shared.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 5,
    }),
    EffectsModule.forRoot([AuthEffectsService]),
    FormlyModule.forRoot(),
    SharedModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
