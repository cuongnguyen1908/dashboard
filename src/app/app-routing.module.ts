import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { RootNavComponent } from './root-nav/root-nav.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth/auth-guard';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: RootNavComponent, canActivate: [AuthGuard], children: [
    {path: '', component: HomeComponent, pathMatch: 'full'},

      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: ProductListComponent, pathMatch: 'full'},
          { path: 'new', component: ProductEditComponent},
          { path: 'edit/:id', component: ProductEditComponent},
          { path: ':id', component: ProductDetailComponent},
        ],
      },
  ] },
  { path: 'login', component: AuthComponent },
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
