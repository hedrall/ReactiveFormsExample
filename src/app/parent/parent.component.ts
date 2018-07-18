import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  public formGroup: FormGroup; // 全てのコントロールをまとめる為のグループを宣言

  // 住所のフォームの数だけ、ラベルを宣言する
  public addresses = [ '住所1', '住所2' ];

  // 電話番号のフォームの数だけ、ラベルを宣言する
  public phone_numbers = [ '電話番号1', '電話番号2' ];

  constructor( private formBuilder: FormBuilder ) {

    setInterval( () => {
      console.log(this.formGroup);
    }, 3000);

    this.formGroup = this.formBuilder.group( { // group関数でFormGroupを生成
      addresses: this.formBuilder.array( [] ),    // Arrayで宣言する部分をあらかじめセットする
      phone_numbers: this.formBuilder.array( [] ) // 同上
    } );

    // addControl で氏名のコントロールを追加
    // option, validatorは必要があれば入力
    this.formGroup.addControl( 'name', new FormControl( { value: '' /* option */ }, [ /* validator */ ] ) );

    // 年齢のコントロールを追加
    // validatorに 0 ~ 100 までの値を入力する様にvalidationルールを設定する
    this.formGroup.addControl( 'age', new FormControl( {},
      [ this.range(0, 100) ] // validatorに関しては[おまけ]を参照
    ) );

    // 住所のformGroupをセット
    this.addresses.map( () => {
      const child_form_group = this.formBuilder.group({});
      // formGroupにコントロールをセット
      child_form_group.addControl( 'prefecture', new FormControl( {}, [] ) );
      child_form_group.addControl( 'city', new FormControl( {}, [] ) );
      // formGroupのaddresses(FormArray)に生成した子コンポーネントを追加する
      // ( FormGroup.getはAbstractControlを返すので、as句を使ってダウンキャスとする )
      ( this.formGroup.get( 'addresses' ) as FormArray ).push( child_form_group );
    });
  }

  // 範囲を確認するValidator
  public range = ( min: number, max: number ): Function => {
    return  ( control: AbstractControl ): null | string => {
      const value = control.value;
      // valueがセットされていない時はエラーなし
      if ( value === null || value === undefined ) {
        return null;
      }

      // 値が範囲ないに収まっていることを確認する
      return ( ( value >= min ) && ( value <= max) ) ? null : min + '~' + max + 'の値を入力してください。';
    };
  };

  // formGroupからstrをキーとするFormArrayを返す
  public getFormArrayOfString = ( str: string ): FormArray => {
    // ( FormGroup.getはAbstractControlを返すので、as句を使ってダウンキャスとする )
    return ( this.formGroup.get( str ) as FormArray );
  };
}
