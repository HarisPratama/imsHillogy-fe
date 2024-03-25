import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {

  }

  formBuilder = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required],
  })

  ngOnInit(): void {
    if (this.data.name) {
      this.formBuilder.patchValue(this.data)
    }
  }

  getField(formName: string) {
    return this.formBuilder.get(formName)
  }

  getErrorMessage(field: string) {
    if (this.getField(field)?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.getField(field)?.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    this.dialogRef.close()
  }
}
