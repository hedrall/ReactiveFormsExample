import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-children2',
  templateUrl: './children2.component.html',
  styleUrls: ['./children2.component.css']
})
export class Children2Component implements OnInit {

  @Input() formArray: FormArray; // 親コンポーネントからFormArrayを受け取る
  public childFormGroup: FormGroup; // このコンポーネントのFormGroupを保持する
  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit() {
    // このコンポーネントのFormGroupを初期化する
    this.childFormGroup = this.formBuilder.group({});

    // FormGroupにコントロールをセットして行く
    this.childFormGroup.addControl( 'phone_number1', new FormControl( '', [] ) );
    this.childFormGroup.addControl( 'phone_number2', new FormControl( '', [] ) );

    // 親コンポーネントのフォームに追加する
    this.formArray.push( this.childFormGroup );
  }

}
