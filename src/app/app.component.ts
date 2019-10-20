import { Component } from '@angular/core';

@Component({ //декоратор
  selector: 'app-root',//идентификатор компонента в приложении
  templateUrl: './app.component.html', //представление(ссылка на шаблон)
  styleUrls: ['./app.component.css'] //массив стилей css
})
export class AppComponent {
  title = 'var8';
}
