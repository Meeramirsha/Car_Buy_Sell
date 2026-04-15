import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarListComponent } from './car-list/car-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentComponent } from './payment/payment.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { AddCarComponent } from './add-car/add-car.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ComparisonComponent } from './comparison/comparison.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'sell', component: SellComponent, canActivate: [authGuard] },
  { path: 'cars', component: CarListComponent },
  { path: 'booking/:carId', component: BookingComponent, canActivate: [authGuard] },
  { path: 'payment/:bookingId', component: PaymentComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard] },
  { path: 'compare', component: ComparisonComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'add-car', component: AddCarComponent, canActivate: [adminGuard] },
  // Default route
  { path: '**', redirectTo: '' }
];
