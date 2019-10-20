import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { HttpService } from '../http.service';
import { FormControl, FormGroup } from '@angular/forms';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {


  searchstring:string = '';
  sortParam:string;
  sortForm: FormGroup;

  constructor(private httpService: HttpService) {
    this.sortForm = new FormGroup({ //инициализируем форму с импутами
      sort: new FormControl(null)
    });//новая форма с одним параметро сорт
   }

   guests=[];
  async ngOnInit() { //вызывается один раз после установки свойств компонента,
    //которые участвуют в привязке. Выполняет инициализацию компонента. Запускается после конструктора.
    try {
      let guests = this.httpService.getProducts();
      this.searchstring = this.searchstring.toLowerCase();
      this.guests = (isNullOrUndefined(await guests)) ? [] : await guests; //если да - в массив,если нет,ожидаем
      
      
        // Создаем переменную guests и записываем в нее обещание, которое вернул метод сервиса.
  // В результате это обещание будет массивом постов, либо null,
  //  в случае, если постов нет. В this.guests мы запишем содержимое guests,
  //  а в случае null – пустой массив.

      
      
      
      
      // console.log("jopa");
      ////////////////////this.guests.reverse();///////////////////////////

      let sort = this.httpService.getSort(); // берем данные с бд,которые будут сохранены
      	this.sortParam = (isNullOrUndefined(await sort)) ? "" : await sort;
			  this.sortParam = this.sortParam[0]["param"];
			  
			  let searchstring = this.httpService.getFilter();
      	this.searchstring = (isNullOrUndefined(await searchstring)) ? "" : await searchstring;
      	this.searchstring = this.searchstring[0]["param"];

      	this.sortForm.patchValue({ //сопоставляет значения с html d ts , проверка на валидность значения
        	sort: this.sortParam
        });

    } catch (err) {
      console.log(err)
    }

  }


  //берем значения импута и закидываем в бд
  async sorting() {
    this.sortParam = this.sortForm.value.sort;
    await this.httpService.putSort({ "id": 0, "param": this.sortParam });
  }
  //закидывается в базу данных

  async filtering() {
    await this.httpService.putFilter({ "id": 0, "param": this.searchstring });
  }

}
