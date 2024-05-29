import { Component, input, output } from '@angular/core';
import { Notification } from '../../notification';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('300ms ease-in'),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-out',
          style({ opacity: 0, transform: 'translateY(100%)' })
        ),
      ]),
    ]),
  ],
})
export class NotificationComponent {
  notification = input.required<Notification>();

  closed = output();

  close() {
    this.closed.emit();
  }
}
