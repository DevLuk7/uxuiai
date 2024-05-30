import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'uxuiai',
        appId: '1:128606234578:web:57fe3899bb19e3239d4a0b',
        storageBucket: 'uxuiai.appspot.com',
        apiKey: 'AIzaSyBjrI_nZJ5hrB6V2pahzWqDLzfhobNVTUU',
        authDomain: 'uxuiai.firebaseapp.com',
        messagingSenderId: '128606234578',
        measurementId: 'G-TE7TCZVR6E',
      })
    ),
    provideVertexAI(() => getVertexAI()),
    provideAuth(() => getAuth()),
    provideAnimationsAsync(),
  ],
};
