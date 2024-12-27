import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  contacts: Array<Contact>;

  constructor(private contactService: ContactService) {
    this.contacts = [];
  }

  ngOnInit(): void {
    this.getAll();
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
        this.getAll();
      }
    });
  }
}
