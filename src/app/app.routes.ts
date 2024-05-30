import { Routes } from '@angular/router';
import { PageGenerateComponentComponent } from './feature/page-generate-component/page-generate-component.component';
import { PageGeneratePageComponent } from './feature/page-generate-page/page-generate-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'component',
    pathMatch: 'full',
  },
  {
    path: 'component',
    component: PageGenerateComponentComponent,
  },
  {
    path: 'page',
    component: PageGeneratePageComponent,
  },
];
