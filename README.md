<h1>📇 Excel application</h1>
<p>Данный проект реализован по подобию Google таблиц</p>
<p>
  <strong>
    Посмотреть проект можно по данной ссылке: 
  </strong>
  https://gbxbro.github.io/excel-app/
</p>
<p>
  <strong>🔧 Функционал:</strong>
  возможность создания и удаления таблиц где отображается дата последнего открытия, с сохранением их состояния.
  Состояние хранит в себе ресайз колонок и ячеек, название таблицы, данные заполненные в ячейках и примененные в них стили. 
  Состояние сохраняется в local storage.
</p>
<p>
  Данное приложение было написано на чистом JS без использования фреймворков и библиотек. В рамках данного проекта, создан небольшой класс-аналог Jquery,
  а так же мини-фреймворк позволяющий разбивать приложение на отдельные компоненты и вешать на них события. За основу state managment был взят подход redux с паттерном Observer.
  Так же есть возможность подписывать компоненты двухсторонней связью напрямую с тем же паттерном.
</p>
