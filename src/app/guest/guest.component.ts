import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { HttpService } from "../http.service"


@Component({
  selector: 'app-guest', // идентификатор компонента в приложении
  templateUrl: './guest.component.html', //представление
  styleUrls: ['./guest.component.css'] //массив стилей css
})
export class GuestComponent implements OnInit {
  id:number;
  itemForm: FormGroup;
  guest;

  constructor(
    private activatedRouter: ActivatedRoute, // хранит url адрес и параметры
    private router: Router, // этот сервис используется для навигации
    private httpService: HttpService
  ) {
    //айди с прошлого компонента в нынешний
      this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
      });
    }


  ngOnInit() {
    this.getProduct().then(() => { 
      console.log(this.guest);
      this.itemForm = new FormGroup({
        name: new FormControl(this.guest.name),
        phone: new FormControl(this.guest.phone),
    
      });
    });

  }

  async getProduct(){
    this.guest = await this.httpService.getProductById(+this.id);
  }
//создаем методы для получения постов,
//на базе основных методов взаимодействия с api.

  async onSaveForm() {
    console.log(this.guest.name);
    this.guest = await this.httpService.putProductById(this.id, 
      {
        "id": this.guest.id,
        "name": this.itemForm.value.name,
        "phone": this.itemForm.value.phone
      
      });
    console.log(this.guest.name);
    this.router.navigate([`/catalog`]);
  }

  async onDelete(){
    this.guest = await this.httpService.deleteProductById(this.id);
    this.router.navigate([`/catalog`]);// метод navigate используется для программной навигации
  }  
}
