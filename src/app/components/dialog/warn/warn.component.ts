import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  onClick?: Function;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.scss']
})
export class WarnComponent {
  constructor(
    public dialogRef: MatDialogRef<WarnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClick() {
    if(this.data.onClick) this.data.onClick()
    this.dialogRef.close()
  }
}
