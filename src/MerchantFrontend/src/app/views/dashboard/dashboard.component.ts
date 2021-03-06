import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantApiService } from '../../core/services/merchant-api.service';
import { Authority } from 'src/app/core/models/authority.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'portal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  showRegisterOrganizationModal: boolean;
  showRegisterMerchantModal: boolean;
  showPasswordResetConfirmModal = false;
  authorities$: Observable<Authority[]>;
  registrationCompleted = false;
  token: string;

  constructor(
    private readonly merchantApiService: MerchantApiService,
    private readonly activeRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params.token) {
        this.token = params.token;
        this.showPasswordResetConfirmModal = true;
      }
    });
    this.authorities$ = this.getAuthorities();
    this.registrationCompleted = this.activeRoute.snapshot.queryParamMap.get("merchantRegistrationCompleted") === '1';

  }

  getAuthorities(): Observable<Authority[]>{
    return this.authorities$ = this.merchantApiService.getAuthorities();
  }

  registerOrganization(): void {
    this.showRegisterOrganizationModal = false;
    setTimeout(() => {
      this.showRegisterOrganizationModal = true;
    });
  }

  registerMerchant(): void {
    this.showRegisterMerchantModal = false;
    setTimeout(() => {
      this.showRegisterMerchantModal = true;
    });
  }
}
