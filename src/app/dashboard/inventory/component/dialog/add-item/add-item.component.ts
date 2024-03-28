import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item/item.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

export interface DialogData {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  type?: string;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private itemService: ItemService,
    private transactionService: TransactionService,
  ) {

  }

  formBuilder = this.fb.group({
    name: [{ value: '', disabled: this.data?.type == 'sales' ? true : false }, Validators.required],
    description: [{ value: '', disabled: this.data?.type == 'sales' ? true : false }, Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required],
  })

  ngOnInit(): void {
    if (this.data?.name) {
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
    if (this.formBuilder.valid){
      let data :any = {
        name: this.formBuilder.value.name ?? this.data.name,
        description: this.formBuilder.value.description ?? this.data.description,
        price: this.formBuilder.value.price ?? 0,
        quantity: this.formBuilder.value.quantity ?? 0,
      }

      if (this.data) {
        
        if (this.data.type == 'sales') {
          data['itemId'] = this.data._id;
          this.transactionService.postTransactions(data)
          .subscribe((resp) => {
            this.dialogRef.close()
            this.itemService.getItems()
          })
        } else {
          this.itemService.putItem({ _id: this.data._id, ...data})
          .subscribe((resp) => {
            this.dialogRef.close()
            this.itemService.getItems()
          })
        }
      } else {
        this.itemService.postItem(data)
          .subscribe((resp) => {
            this.dialogRef.close()
            this.itemService.getItems()
          })
      }
    }
  }
}
