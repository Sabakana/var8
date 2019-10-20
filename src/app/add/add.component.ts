import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from '../http.service';



@Component({
  selector: 'app-add', //идентификатор компонента в приложении
  templateUrl: './add.component.html',//представление(ссылка на шаблон)
  styleUrls: ['./add.component.css']//массив стилей css
})
export class AddComponent implements OnInit { 
  // После создания компонента фреймворк Angular вызывает у этого компонента ряд методов, 
  // которые представляют различные этапы жизненного цикла
  id:number; //тип данных
  itemForm: FormGroup;
  product;

  constructor(
    private activateRouted: ActivatedRoute, // хранит url адрес и параметры/ Предоставляет доступ к информации о маршруте, связанном с компонентом
    private router: Router,// этот сервис используется для навигации
    private httpService: HttpService //Для взаимодействия с сервером и отправки запросов по протоколу http
  ) {
      this.activateRouted.params.subscribe(param =>{
        // Метод subscribe() позволяет установить подписку на изменение параметра маршрута
    this.id = param.id; //берет айдишник у предыдущего и присваивает нынешнему
  }); }

  ngOnInit() {   // в теле выполняются скрипты при загрузке страницы
    this.itemForm = new FormGroup({
      name: new FormControl(null, [Validators.required]), //required: требует обязательного ввода значения
      phone: new FormControl(null, [Validators.required])
    });
  }

  // Валидатор - это функция, которая обрабатывает FormControlили коллекцию элементов управления и возвращает карту ошибок или ноль.
  //  Нулевая карта означает, что проверка прошла успешно.


  //асинхронная  функция - это функция, после вызова которой приложение продолжает работать,потому что функция сразу выполняет возврат
  async add() {
    this.product= await this.httpService.postProduct(
      {
        "id":this.itemForm.value.id,
        "name":this.itemForm.value.name, 
        "phone":this.itemForm.value.phone
        
      });
      this.router.navigate([`/catalog`]);
  }

}
