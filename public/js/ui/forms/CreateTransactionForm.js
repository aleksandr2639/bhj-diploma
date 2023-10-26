/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();
    Account.list(currentUser, (err, response) => {
      const data = response.data;
      const accountsSelect = this.element.querySelector('.accounts-select');
      let options = '';
      data.forEach(obj => {
        options += `<option value="${obj.id}">${obj.name}</option>`;
      });
      accountsSelect.innerHTML = options;
    });
  }
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (response) => {
      if (response && response.success) {
        this.element.reset();
        App.update();
        if(this.element.id == 'modal-new-income') {
          App.getModal('newIncome').close();
        } else if (this.element.id == 'modal-new-expense') {
          App.getModal('newExpense').close();
        }
      }
      App.update()
    })
  }
}