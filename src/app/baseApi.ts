import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseApi {
	// Данный класс в этом проекте родительский для сервисов, осуществляющих 
	// http запросы. В нем созданы методы для осуществления основных 
	// http запросов post, put, get, delete 

	private baseUrl = 'http://localhost:3000/';
	// Адрес api

	constructor(public http: HttpClient) { }
// Для осуществления http запросов используется класс HttpClient
// С его помощью наш клиент будет отправлять запросы на сервер
	private getUrl(url: string = ''): string {
		return this.baseUrl + url;
	}
	// метод для формирования строки запроса
	
	public get(url: string = '', header: HttpHeaders): Observable<any> { //коллекция  // гет принимает 
		let requestOptions = {
			headers: header
		};
		return this.http.get(this.getUrl(url), requestOptions); 
	}
	// Данному методу нужна строка запросы (url) и заголовок запроса (header).
	// Метод будет возвращать observable, 
	// который мы в дальнейшем переделаем в promise для удобства использования.


	
	public post(url: string = '', data, header: HttpHeaders): Observable<any> {
		let requestOptions = {
			headers: header
		};
		return this.http.post(this.getUrl(url), data, requestOptions);
	}

// POST используется для отправки сущностей к определённому ресурсу. 
// Часто вызывает изменение состояния или какие-то побочные эффекты на сервере.


	public put(url: string = '', data: any = {}, header: HttpHeaders): Observable<any> {
		let requestOptions = {
			headers: header
		};
		return this.http.put(this.getUrl(url), data, requestOptions);
	}
	// PUT заменяет все текущие представления ресурса данными запроса.

	public delete(url: string = '', header: HttpHeaders): Observable<any> {
		let requestOptions = {
			headers: header
		};
		return this.http.delete(this.getUrl(url), requestOptions);
	}
// DELETE удаляет указанный ресурс.
}