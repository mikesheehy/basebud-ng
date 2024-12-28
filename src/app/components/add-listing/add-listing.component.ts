import { Component } from '@angular/core';
import { Listing } from '../../models/listing.model';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent {

  listing: Listing = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private listingService: ListingService) { }

  saveListing(): void {
    const data = {
      title: this.listing.title,
      description: this.listing.description
    };

    this.listingService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newListing(): void {
    this.submitted = false;
    this.listing = {
      title: '',
      description: '',
      published: false
    };
  }
}
