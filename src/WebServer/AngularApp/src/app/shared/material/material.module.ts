import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatSnackBarModule,
  MatListModule,
  MatTabsModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatDatepickerModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
// import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule,
    MatListModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDatepickerModule
    // CdkTableModule
  ],
  exports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule,
    MatListModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDatepickerModule
    // CdkTableModule
  ]
})
export class MaterialModule {}
