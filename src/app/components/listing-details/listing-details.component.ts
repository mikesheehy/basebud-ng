import { Component, Input, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../../models/listing.model';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.css'
})
export class ListingDetailsComponent implements OnInit{

  @Input() viewMode = false;

  @Input() currentListing: Listing = {
    title: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getListing(this.route.snapshot.params["id"]);
    }
  }

  getListing(id: string): void {
    this.listingService.get(id)
      .subscribe({
        next: (data) => {
          this.currentListing = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentListing.title,
      description: this.currentListing.description,
      published: status
    };

    this.message = '';

    this.listingService.update(this.currentListing.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentListing.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateListing(): void {
    this.message = '';

    this.listingService.update(this.currentListing.id, this.currentListing)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This listing was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteListing(): void {
    this.listingService.delete(this.currentListing.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/listings']);
        },
        error: (e) => console.error(e)
      });
  }

}
