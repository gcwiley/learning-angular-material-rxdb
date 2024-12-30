import { Portal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxAppVersionDirective } from 'ngx-app-version';
import { Observable } from 'rxjs';
import { DEFAULT_LANGUAGE } from './shared/constants/language.constant';
import { SeoDirective } from './shared/directives/seo.directive';
import { BreadcrumbsPortalService } from './shared/services/breadcrumbs-portal.service';
import { RxdbProvider } from './shared/services/db.service';
import { LanguageService } from './shared/services/language.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
   hostDirectives: [NgxAppVersionDirective, SeoDirective],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      AsyncPipe,
      RouterOutlet,
      RouterLink,
      MatIconModule,
      MatButtonModule,
      TranslateModule,
      MatToolbarModule,
      LocalizeRouterModule,
      PortalModule,
   ],
})
export class AppComponent implements OnInit {
   private destroyRef = inject(DestroyRef);
   public endYear = new Date().getFullYear();
   public breadcrumbsPortal$!: Observable<Portal<unknown>>;
   public lang = DEFAULT_LANGUAGE;

   constructor(
      private language: LanguageService,
      private rxdbProvider: RxdbProvider,
      private breadcrumbsPortalService: BreadcrumbsPortalService
   ) {
      this.language.setLang(this.lang === 'en' ? 'cs' : 'en');
   }

   public ngOnInit(): void {
      this.rxdbProvider.initDB('posts-db');
      this.breadcrumbsPortal$ = this.breadcrumbsPortalService.portal$;
      this.language.language$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((language) => (this.lang = language));
   }

   public toggleLanguage() {
      this.language.setLang(this.lang === 'en' ? 'cs' : 'en');
   }
}
