import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export function ValidateUrl(control: AbstractControl,control2:AbstractControl) {
    if (control.value.startsWith(' ') || control.value.includes('.')) {
      return { validUrl: true };
    }
    return null;
  }


  export function confirmation (control1Value: string,control2Value:string) {
      return (formGroup:FormGroup)=>{
          const control1 = formGroup.controls[control1Value];
          const control2 = formGroup.controls[control2Value];
        if (control2.value !== control1.value) {
            control2.setErrors({ myconfirmation: true });
        }else{
            control2.setErrors(null);
        }
      }
    
  }