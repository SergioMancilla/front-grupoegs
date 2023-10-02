import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  sesion_user_id: number;
  users: any[] = [];
  cities: any[] = [];
  document_id_types: any[] = [];
  filterForm: FormGroup;

  constructor(
    private userService: UserService,
    private cityService: CityService,
    private documentTypeService: DocumentService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.filterForm = this.addFilterFormValidators();

    this.filterForm.valueChanges.subscribe(() => {
      this.onSubmitFilterForm();
    });

    this.sesion_user_id = this.getSesionIdUSer();
  }

  ngOnInit(): void {
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

  onSubmitFilterForm() {
    const formData = this.filterForm.value;
    const { names, last_name, document_number, id_city } = formData;
    let queryData = formData;
    if (id_city === 0)
      queryData = {names, last_name, document_number};
    this.userService.filterUser(queryData).subscribe((users_filtered) => {
      this.users = users_filtered;
    });
  }

  deleteUSer(user_id:number) {
    this.userService.removeUser(+user_id).subscribe(user => {
      this.getAllUsers();
    })
  }

  addFilterFormValidators() {
    return this.fb.group({
      names: [''],
      document_number: [''],
      last_name: [''],
      id_city: [''],
    });
  }

  getSesionIdUSer() {
      return JSON.parse(localStorage.getItem("user") || "{}")['id'];
  }

}
