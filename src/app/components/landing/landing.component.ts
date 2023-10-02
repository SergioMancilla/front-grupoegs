import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { DocumentService } from 'src/app/services/document_type.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user: any;
  users: any[] = [];
  cities: any[] = [];
  document_id_types: any[] = [];

  constructor(
    private userService: UserService,
    private cityService: CityService,
    private documentTypeService: DocumentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.user = this.route.snapshot.paramMap.get('user');
    console.log(this.user);
    this.getCities();
    this.getDocumentIdTypes();
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    })
  }

  getCities() {
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
    })
  }

  getDocumentIdTypes() {
    this.documentTypeService.getDocumentTypes().subscribe(document_types => {
      this.document_id_types = document_types;
    })
  }

  getCityNameById(id_city: number) {
    const city = this.cities.find(city => city['id'] == id_city)
    return city? city['name'] : "Ciudad no encontrada";
  }

  getDocumentTypeById(id_document_type: number) {
    const dt = this.document_id_types.find(dt => dt['id'] == id_document_type)
    return dt? dt['document_type'] : "Tipo de documento no encontrado";
  }

}
