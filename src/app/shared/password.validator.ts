import { AbstractControl } from '@angular/forms';

/**
 * This function validates whether the password and confirm password 
 * fields match or not
 * Validation takes place only after both the fields are touched
 * 
 */
export function passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('tempPass');
    const confirmPassword = control.get('confirmPass');

    if(password.pristine || confirmPassword.pristine) {
        return null;
    }
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'mismatch': true } : null;
}