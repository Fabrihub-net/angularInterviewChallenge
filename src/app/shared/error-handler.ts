import {HttpErrorResponse} from "@angular/common/http";

export class ErrorHandler {
    // method to ensure that no error and if there is any error show error reason server or client
  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:' + errorResponse.error.message);
      console.error('Server Side Error:' + errorResponse);
    } else {
      return alert('please refresh the website again, maybe there are problems with the server!!');
    }
  }
}