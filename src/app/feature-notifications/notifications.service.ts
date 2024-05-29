import { Injectable, InputSignal, inject, signal } from '@angular/core';
import { NotificationComponent } from './ui/notification/notification.component';
import { Notification } from './notification';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AnimationBuilder, animate, style } from '@angular/animations';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private overlay = inject(Overlay);
  private animationBuilder = inject(AnimationBuilder);

  private overlays: OverlayRef[] = [];

  show(notification: Notification): void {
    const overlayRef = this.createOverlay();
    const notificationPortal = new ComponentPortal(NotificationComponent);
    const notificationRef = overlayRef.attach(notificationPortal);
    notificationRef.instance.notification = signal(notification) as any;
    this.overlays.push(overlayRef);

    notificationRef.instance.closed.subscribe(() => {
      const index = this.overlays.indexOf(overlayRef);
      if (index > -1) {
        this.overlays.splice(index, 1);
        overlayRef.dispose();
        this.updatePositions();
      }
    });

    setTimeout(() => {
      notificationRef.instance.close();
    }, 3000);

    this.updatePositions();
  }

  private createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: false,
      positionStrategy: this.overlay
        .position()
        .global()
        .top('20px')
        .right('20px'),
    });

    return this.overlay.create(overlayConfig);
  }

  private updatePositions(): void {
    this.overlays.forEach((overlay, index) => {
      const positionStrategy = this.overlay
        .position()
        .global()
        .top(`${20 + index * 100}px`)
        .right('20px');
      const animation = this.animationBuilder.build([
        animate('300ms ease-in-out', style({ top: `${20 + index * 100}px` })),
      ]);
      const player = animation.create(overlay.overlayElement);
      player.play();
      overlay.updatePositionStrategy(positionStrategy);
      overlay.updatePosition();
    });
  }
}
