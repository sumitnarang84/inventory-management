import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AddProductComponent } from './product/add-product/add-product.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'products', component: ListProductComponent, canActivate: [AuthGuard]  },
  { path: 'products/:id', component: ViewProductComponent, canActivate: [AuthGuard]  },
  { path: 'add-product', component: AddProductComponent, canActivate : [AuthGuard]}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
