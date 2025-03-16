import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const interceptador: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem('token');

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  

  return next(authReq).pipe(
    catchError((err: any) => {
      console.log('INTERCEPTADO: ' + authToken);
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        switch (err.status) {
          case 403:
            console.error('Token vencido');
            sessionStorage.removeItem('token');
            break;

          case 401:
            console.error('Unauthorized request:', err);
            break;

          case 500:
            console.error('>>>>>>>>>>>>>>>', err);
            console.log('AAAA');
            console.log(authReq);
              const customError = new HttpErrorResponse({
                error: { message: 'Erro ao se comunicar com o servidor, verifique a conexão e tente novamente mais tarde' },
                status: 500,
                statusText: 'Internal Server Error',
                url: err.url || ''
              });
              if(err.error == null || err.error == undefined)
                return throwError(() => customError);
              break;
              
          default:
            //console.log(err.status);
            // Handle other HTTP error codes
            //console.error('HTTP error:', err);
            break;
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
