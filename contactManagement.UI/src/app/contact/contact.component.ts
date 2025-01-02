import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import{ ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  contact: Contact | undefined;
  @Input() contactId: any;
  @Output() getAllContact =  new EventEmitter<void>();
  constructor(private fb: FormBuilder, private contactService:ContactService, 
              public activeModal: NgbActiveModal, private toastrService: ToastrService) {
    // Initialize the form with validation
    this.contactForm = this.fb.group({
      id: [0],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]]
    });
  }

  ngOnInit(): void {
      if (this.contactId != 0) {
        this.contactService.get(this.contactId).subscribe(res => {
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
  }

  saveData(){
    if(this.contactForm.valid){
      //update
      if (this.contactForm.value.id > 0) {
        this.contactService.update(this.contactForm.value).subscribe(res => {
          if (res.status == 200) {
            this.toastrService.success('Contact update successful.');
            this.getAllContact.emit();
          }
        });
      }
      //add
      else{
        this.contactService.add(this.contactForm.value).subscribe(res => {
          if (res.status == 201) {
            this.toastrService.success('Contact add successful.');
            this.getAllContact.emit();
          }
        });
      }
    }
  }

  closeModal() {
    this.activeModal.close();
  }
  
}
