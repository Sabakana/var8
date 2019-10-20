import { Injectable } from '@angular/core';
import { BaseApi } from './baseApi';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
//при создании сервиса в декораторе Injectable появилась возможность указать,
//что данный сервис предоставляется во всем приложении, записью
// Без этой записи – требуется указать сервис в списке провайдеров модуля, 
// внутри которого он предоставляется
//  (с учетом иерархии). 

export class HttpService extends BaseApi { //объявляем сервлеты , набор методов для работы с данными

  options: HttpHeaders;

	constructor(public http: HttpClient) {
		super(http); // базовый класс,наследуем методы из http serviсе и встраиваем в свой
		this.options = new HttpHeaders();
		this.options = this.options.set('Content-Type', 'application/json');
	}

	async getProducts() {
		return this.get('guests', this.options).toPromise(); //кидаем в обещания чтобы легче было работать,удобство использования
	}
	

	async getProductById(id) {
		return this.get('guests/' + id, this.options).toPromise();
	}
	
	async postProduct(data) { //дата - данные , пост добавление
		return this.post('guests', data, this.options).toPromise(); 
	}

	async putProductById(id, data) { // изменение
		return this.put('guests/' + id, data, this.options).toPromise();
	}

	async deleteProductById(id) {
		return this.delete('guests/' + id, this.options).toPromise();
	}

	// сохранение поля поиска и сортировки
	async getSort() {
		return this.get('sort', this.options).toPromise(); //получаем данные с бд, опц - джсон объект
	}
	async putSort(data) {
		return this.put('sort/0', data, this.options).toPromise();
	}

	async getFilter() {
		return this.get('filter', this.options).toPromise();
	}
	async putFilter(data) {
		return this.put('filter/0', data, this.options).toPromise();
	}

}
