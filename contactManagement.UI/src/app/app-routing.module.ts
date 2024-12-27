import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:'', component: ContactsComponent},
  {path:'contacts', component: ContactsComponent},
  {path:'contact', component: ContactComponent},
  {path:'contact/:id', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
