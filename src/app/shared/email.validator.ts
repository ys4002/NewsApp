import { AbstractControl, ValidatorFn } from "@angular/forms";

export function emailValidator(control: AbstractControl): {[key: string] :any} | null {
    const forbidden = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test(control.value);
    return forbidden ? null : {'email':{value: control.value}};
}