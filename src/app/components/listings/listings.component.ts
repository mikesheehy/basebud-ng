import { Component, OnInit } from '@angular/core';
import { Listing } from '../../models/listing.model';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent implements OnInit{

  listings?: Listing[];
  currentListing: Listing = {};
  currentIndex = -1;
  title = '';

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.retrieveListings();
  }

  retrieveListings(): void {
    this.listingService.getAll()
      .subscribe({
        next: (data) => {
          this.listings = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveListings();
    this.currentListing = {};
    this.currentIndex = -1;
  }

  setActiveListing(listing: Listing, index: number): void {
    this.currentListing = listing;
    this.currentIndex = index;
  }

  removeAllListings(): void {
    this.listingService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentListing = {};
    this.currentIndex = -1;

    this.listingService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.listings = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
