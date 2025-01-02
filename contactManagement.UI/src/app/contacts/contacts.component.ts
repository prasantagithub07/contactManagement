import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from '../contact/contact.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  contacts: Array<Contact>;

  constructor(private contactService: ContactService, private modalService: NgbModal, 
              private tostrService: ToastrService) {
    this.contacts = [];
  }

  ngOnInit(): void {
    this.getAll();
    //this.openModal();
  }

  private getAll(){
    this.contactService.getAll().subscribe(res => {
          if (res.status == 200 && res.body != null) {
            this.contacts = res.body;
          }
        });
  }

  deleteContact(id: number){
    //console.log('deleteContact');
    this.contactService.delete(id).subscribe(res => {
      if (res.status == 200) {
        this.tostrService.error('Conact delete successful.');
        this.getAll();
      }
    });
  }

  openModal(contactId: number) {
    const modalRef = this.modalService.open(ContactComponent);
    modalRef.componentInstance.contactId = contactId; 

    modalRef.componentInstance.getAllContact.subscribe(()=>{
      //console.log('getAllContact'); 
      this.getAll();
    });
  }

}
