import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../models/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  contact: Contact | undefined;

  constructor(private fb: FormBuilder, private contactService:ContactService, private route:ActivatedRoute, private router: Router) {
    // Initialize the form with validation
    this.contactForm = this.fb.group({
      id: [0],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      let id = p['id'];
      //console.log(id);
      if (id != undefined) {
        this.contactService.get(id).subscribe(res => {
          if (res.status == 200 && res.body != null) {
            this.contact = res.body;
            //console.log(this.contact);
            this.contactForm.controls['id'].setValue(this.contact.id);
            this.contactForm.controls['firstName'].setValue(this.contact.firstName);
            this.contactForm.controls['lastName'].setValue(this.contact.lastName);
            this.contactForm.controls['email'].setValue(this.contact.email);
          }
        });
      }
    });
  }

  saveData(){
    if(this.contactForm.valid){
      //update
      if (this.contactForm.value.id > 0) {
        this.contactService.update(this.contactForm.value).subscribe(res => {
          if (res.status == 200) {
            this.router.navigate(['/contacts']);
          }
        });
      }
      //add
      else{
        this.contactService.add(this.contactForm.value).subscribe(res => {
          if (res.status == 201) {
            this.router.navigate(['/contacts']);
          }
        });
      }
    }
  }
  
}
