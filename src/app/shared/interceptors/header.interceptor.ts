import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment.local';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  EXCLUDED_URLS = ['api/users/extract'];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes(environment.api_url) || this.isMultipartFileRequest(request.url) || this.isExcluded(request.url)) {
      return next.handle(request);
    }

    const modified = request.clone({
      setHeaders: {
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      }
    });

    return next.handle(modified);
  }

  private isExcluded(requestUrl: string) {
    return this.EXCLUDED_URLS.some(url => requestUrl.includes(url));
  }

  private isMultipartFileRequest(url: string) {
    return url.includes('api/file');
  }
}
