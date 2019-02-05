import { Component, OnInit } from '@angular/core';
import { Claim } from "../../shared/model/Claim";
import { ClaimCacheService } from "../../shared/claim-cache.service";
import { CarInfoService } from '../../shared/car-info.service';
import { DictionaryItem } from '../../shared/model/DictionaryItem';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from '../../shared/push-notification.service';
import { CarPredicatorService } from '../../shared/car-predicator.service';
import { ClaimService } from '../../shared/claim.service';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit {

  carMakes: DictionaryItem[];
  claim: Claim = new Claim();
  isLoading = true;
  public selectedFilter = {
    OilFilter: false,
    AirFilter: false,
    GearboxOil: false,
    BreakOil: false,
    SteeringOil: false,
    BattryWater: false,
    Grease: false,
    WindSet: false,
    CabinFilter: false,
  }
  constructor(private claimCacheService: ClaimCacheService,
    private claimService: ClaimService,
    private carInfoService: CarInfoService,
    private swPush: SwPush,
    private pushNotificationService: PushNotificationService,
    private carPredicatorService: CarPredicatorService) {
  }

  ngOnInit() {
    this.carInfoService.getMakes().subscribe((res) => {
      console.log(res);
      this.carMakes = res.map(m => <DictionaryItem>{
        code: m.make_id,
        name: m.make_display
      });
    });

    this.claimCacheService.get().subscribe((cachedClaim) => {
      if (cachedClaim)
        this.claim = cachedClaim;
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  cacheForm() {
    this.claimCacheService.save(this.claim);
  }

  cachePhoto(event: any) {
    let photos = this.claim.photos || [];
    let self = this;

    [].forEach.call(event.target.files, (file) => {
      let reader = new FileReader();

      reader.addEventListener('load', function () {
        photos.push({
          filename: file.name,
          content: this.result
        });
        self.cacheForm();
      });

      reader.readAsDataURL(file);
    });
  }

  clearCache() {
    this.claimCacheService.clear();
    this.claim = new Claim();
  }

  fireImageUpload() {
    document.getElementById('auto-detect-file-upload').click();
  }

  detectByPhoto() {
    this.carPredicatorService.predicate();
  }

  subscribeToNotifications() {
    this.pushNotificationService.addPushSubscriber();
  }

  sendNotificationToAll() {
    this.pushNotificationService.send();
  }

  save() {
    this.claimService.save(this.claim);
  }

  // private mthod


}
