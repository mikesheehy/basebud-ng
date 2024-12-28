import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsComponent } from './components/listings/listings.component';
import { ListingDetailsComponent } from './components/listing-details/listing-details.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';

const routes: Routes = [
  { path: '', redirectTo: 'listings', pathMatch: 'full' },
  { path: 'listings', component: ListingsComponent },
  { path: 'listings/:id', component: ListingDetailsComponent },
  { path: 'add', component: AddListingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
