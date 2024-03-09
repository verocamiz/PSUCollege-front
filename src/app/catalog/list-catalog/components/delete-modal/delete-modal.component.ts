import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
@Output()
public onDeleteCourse : EventEmitter<true>= new EventEmitter();


onDelete(){
  this.onDeleteCourse.emit(true);
}
}
