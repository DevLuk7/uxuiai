import { Routes } from '@angular/router';
import { PageGenerateComponentComponent } from './feature/page-generate-component/page-generate-component.component';
import { PageGeneratePageComponent } from './feature/page-generate-page/page-generate-page.component';
import { GenerateInputService } from './ui/generate-input/generate-input.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'component',
    pathMatch: 'full',
  },
  {
    path: 'component',
    component: PageGenerateComponentComponent,
    providers: [GenerateInputService],
  },
  {
    path: 'page',
    component: PageGeneratePageComponent,
    providers: [GenerateInputService],
  },
];
