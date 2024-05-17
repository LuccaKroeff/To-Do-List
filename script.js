document.addEventListener('DOMContentLoaded', () => {

    class CheckBox {
        constructor(id, onClickCallback) {
            this.id = id
            this.onClickCallback = onClickCallback;
            this.element = this.createElement();
        }

        createElement() {
            let checkbox = document.createElement('input');
            checkbox.classList.add('checkbox');
            checkbox.type = 'checkbox';
            checkbox.id = String(this.id);
            checkbox.onclick = () => this.onClickCallback(this.id);
            return checkbox;
        }
    }


    class DueDate {
        constructor(id, onClickCallback) {
            this.id = id;
            this.onClickCallback = onClickCallback;
            this.element = this.createElement();
        }

        createElement() {
            let dueDate = document.createElement('input');
            dueDate.classList.add('date');
            dueDate.type = 'date';
            dueDate.id = String(this.id);
            dueDate.value = new Date().toISOString().split('T')[0];
            dueDate.min = dueDate.value
            dueDate.max = '2024-12-31';
            return dueDate;
        }
    }


    class DeleteButton {
        constructor(id, onClickCallback) {
            this.id = id;
            this.onClickCallback = onClickCallback;
            this.element = this.createElement();
        }

        createElement() {
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('buttonItem');
            deleteButton.id = String(this.id);
            deleteButton.textContent = '⛔';
            deleteButton.onclick = () => this.onClickCallback(this.id);
            return deleteButton;
        }
    }


    class LineItem {
        constructor(id) {
            this.id = id;
        }

        createNewLineItem() {
            this.id++;

            let newLineItem = document.createElement('div');
            newLineItem.classList.add('listElement');

            let input = document.createElement('input');
            input.classList.add('input');
            if (this.id === 1) {
                input.placeholder = 'Type here what you have to do! 😀';
            }

            let checkbox = new CheckBox(this.id, (id) => this.checkLineItem(id));
            let deleteButton = new DeleteButton(this.id, (id) => this.deleteLineItem(id));
            let prioritySelect = this.createPrioritySelect();
            let dueDate = new DueDate(this.id, (id) => this.addDueDate(id));

            newLineItem.appendChild(checkbox.element);
            newLineItem.appendChild(input);
            newLineItem.appendChild(prioritySelect);
            newLineItem.appendChild(dueDate.element);
            newLineItem.appendChild(deleteButton.element);

            let listBox = document.querySelector('.listBox');

            listBox.appendChild(newLineItem);
        }

        checkLineItem(checkId) {
            const itemToCheck = document.getElementById(checkId).parentNode;
            const input = itemToCheck.querySelector('.input');
            if (document.getElementById(checkId).checked) {
                input.style.textDecoration = 'line-through';
            } else {
                input.style.textDecoration = 'none';
            }
        }

        createPrioritySelect() {
            let select = document.createElement('select');
            select.classList.add('prioritySelect');

            let options = ["High", "Medium", "Low"];
            options.forEach(option => {
                let optionElement = document.createElement('option');
                optionElement.value = option.toLowerCase();
                optionElement.textContent = option;
                select.appendChild(optionElement);
            });

            return select;
        }

        deleteLineItem(buttonId) {
            const itemToDelete = document.getElementById(buttonId).parentNode;
            itemToDelete.remove();
        }
    }

    const lineItem = new LineItem(0);

    document.querySelector('.buttonAddItem').addEventListener('click', () => {
        lineItem.createNewLineItem();
    });
});
