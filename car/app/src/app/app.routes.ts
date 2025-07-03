import { Routes } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component';
import { BuyComponent } from './buy/buy.component';
import { CarListComponent } from './car-list/car-list.component';
import { HomeComponent } from './home/home.component';
import { SellComponent } from './sell/sell.component';
import { FinancingComponent } from './financing/financing.component';
import { HelpComponent } from './help/help.component';
import { AccountComponent } from './account/account.component';
import { OffersComponent } from './offers/offers.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'sell', component: SellComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'financing', component: FinancingComponent },
  // Redirect reviews to home with fragment
  { path: 'reviews', redirectTo: '/', pathMatch: 'full' },
  // Updated routes for the dropdown menu items
  { path: 'offers', component: OffersComponent },
  { path: 'offers/details', component: OfferDetailsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'account', component: AccountComponent },
  // Default route
  { path: '**', redirectTo: '' }
];
