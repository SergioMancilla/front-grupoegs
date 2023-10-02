import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { DocumentService } from 'src/app/services/document_type.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  cities: any[] = [];
  document_id_types: any[] = [];
  registerForm: FormGroup;
  showBadDataMessage: boolean = false;

  constructor(
    private userService: UserService,
    private cityService: CityService,
    private documentTypeService: DocumentService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.addRegisterValidators();
  }

  ngOnInit(): void {
    this.getCities()
    this.getDocumentIdTypes()
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

  onSubmit() {
    if (this.registerForm.valid) {
      const { 
        id_document_type,
        document_number,
        names,
        last_name,
        middle_name,
        born_date,
        id_city,
        email,
        password
       } = this.registerForm.value;
      this.userService.registerUser({
        id_document_type,
        document_number,
        names,
        last_name,
        middle_name,
        born_date,
        id_city,
        email,
        password
      }).subscribe(response => {
        this.authService.onLogin(response['person']);
        this.router.navigate(['/home']);
      },
      (error)=> {
        this.showBadDataMessage = true;
      })
    }
  }

  addRegisterValidators() {
    return this.fb.group({
      id_document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      names: ['', Validators.required],
      last_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      born_date: ['', Validators.required],
      id_city: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
