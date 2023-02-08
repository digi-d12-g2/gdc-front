import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastrSrv: ToastrService
  ) {
  }

  success(message: string) {
    this.toastrSrv.success(message, '', {
      toastClass: 'alert-toast',
      tapToDismiss: false
    });
  }

  error(message: string) {
    this.toastrSrv.error(message, '', {
      toastClass: 'alert-toast',
      tapToDismiss: false
    });
  }
}
