import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ec-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent {
  @Input() public nodeId: string;
  @Output() public commentAdded: EventEmitter<string> = new EventEmitter<string>();

  addCommentForm = new FormGroup({text: new FormControl()});

  onSubmit(nodeId: string) {
    if (this.addCommentForm.valid) {
      this.commentAdded.emit(this.addCommentForm.value.text);
      this.addCommentForm.controls.text.setValue('');
    }
  }
}
