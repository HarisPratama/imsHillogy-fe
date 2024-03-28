import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item/item.service';

interface DialogData {
  threshold: number
}

@Component({
  selector: 'app-set-threshold',
  templateUrl: './set-threshold.component.html',
  styleUrls: ['./set-threshold.component.scss']
})
export class SetThresholdComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SetThresholdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private itemService: ItemService
  ) {}

  threshold = new FormControl(0)

  ngOnInit(): void {
    this.threshold.setValue(this.data.threshold)
  }

  submit() {
    this.itemService.putItemThreshold({ value: this.threshold.value ?? 0 })
      .subscribe((resp) => {
        this.itemService.getThreshold()
        this.dialogRef.close()
      })
  }
}
