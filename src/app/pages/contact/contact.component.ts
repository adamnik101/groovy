import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public title: string = 'Contact us for more information'
  public subtitle: string = 'Or send us an email of an album, artist or a track to add to our web-player'

  contactForm = new FormGroup({
    fullname: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZŠĐŽČĆ][a-zšđžčć]{1,30}(\s[A-ZŠĐŽČĆ][a-zšđžčć]{1,25})?$/)]),
    email: new FormControl('', [Validators.required, Validators.email,]),
    subject: new FormControl(''),
    message: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(250)]),
  })

  constructor(private _snackBar: MatSnackBar, private pageTitle: Title) { }

  ngOnInit(): void {
    this.pageTitle.setTitle('Groovy - Contact')
  }

  save() {
    this.contactForm.reset()
    this.openSnackBar()
  }

  openSnackBar(){
    this._snackBar.open('Message successfully sent!', 'Close')
  }

}
