import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName"/>
          <span *ngIf="applyForm.get('firstName')?.invalid && applyForm.get('firstName')?.touched" style="color: red">
            First Name is required (min 3 characters).
          </span>

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName"/>
          <span *ngIf="applyForm.get('lastName')?.invalid && applyForm.get('lastName')?.touched" style="color: red">
            Last Name is required (min 3 characters).
          </span>

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email"/>
          <span *ngIf="applyForm.get('email')?.invalid && applyForm.get('email')?.touched" style="color: red">
            Enter a valid email.
          </span><br>
          <button type="submit" class="primary" [disabled]="applyForm.invalid">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
  standalone: true
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$")
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$")
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitApplication() {
    if (this.applyForm.valid) {
      const formData = {
        firstName: this.applyForm.value.firstName ?? '',
        lastName: this.applyForm.value.lastName ?? '',
        email: this.applyForm.value.email ?? '',
      };

      localStorage.setItem('applicationData', JSON.stringify(formData));

      this.housingService.submitApplication(formData.firstName, formData.lastName, formData.email);
    } else {
      this.applyForm.markAllAsTouched();
    }
  }
}
