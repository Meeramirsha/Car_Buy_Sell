import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

// Import standalone components
import { AppComponent } from './app.component';
import { AddCarComponent } from './add-car/add-car.component';

@NgModule({
  declarations: [
    // Standalone components should not be declared here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // Import standalone components instead of declaring them
    AppComponent,
    AddCarComponent
  ],
  providers: [
    provideHttpClient()
  ]
  // No bootstrap array needed as we're using bootstrapApplication in main.ts
})
export class AppModule { }

