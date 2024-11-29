class Todo {
    constructor(title) {
        if (!title.trim()) {
            throw new Error("Заметка не может быть пустой!");
        }
        this.title = title;
        this.isCompleted = false;
        this.createdAt = new Date();
        this.updatedAt = null;
    }
    // Обновляю текста заметки
    edit(newTitle) {
        if (!newTitle.trim()) {
            throw new Error("Заметка не может быть пустой!");
        }
        this.title = newTitle;
        this.updatedAt = new Date();
    }
    // Отмечаю заметку как выполненную
    markAsCompleted() {
        this.isCompleted = true;
        this.updatedAt = new Date();
    }
    // Получаю полную информацию о заметке
    getInfo() {
        return {
            title: this.title,
            isCompleted: this.isCompleted,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
class TodoList {
    constructor() {
        this.todos = [];
    }
    // Добавляю новую заметку
    add(title) {
        const newTodo = new Todo(title);
        this.todos.push(newTodo);
    }
    // Удаляю заметку по индексу
    remove(index) {
        if (index < 0 || index >= this.todos.length) {
            throw new Error("Некорректный индекс заметки!");
        }
        this.todos.splice(index, 1);
    }
    // Редактирую заметку по индексу
    edit(index, newTitle) {
        if (index < 0 || index >= this.todos.length) {
            throw new Error("Некорректный индекс заметки!");
        }
        this.todos[index].edit(newTitle);
    }
    // Отмечаю заметку как выполненную
    markAsCompleted(index) {
        if (index < 0 || index >= this.todos.length) {
            throw new Error("Некорректный индекс заметки!");
        }
        this.todos[index].markAsCompleted();
    }
    // Получаю список всех заметок
    getAll() {
        return this.todos.map(todo => todo.getInfo());
    }
    // Поиск заметки по названию
    findByName(name) {
        return this.todos.filter(todo => todo.title.toLowerCase().includes(name.toLowerCase()));
    }
    // Сортировка заметок по статусу (выполненные первыми)
    sortByStatus() {
        return [...this.todos].sort((a, b) => a.isCompleted - b.isCompleted);
    }
    // Сортировка заметок по дате создания
    sortByDate() {
        return [...this.todos].sort((a, b) => a.createdAt - b.createdAt);
    }
    // Получение статистики
    getStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.isCompleted).length;
        const remaining = total - completed;
        return { total, completed, remaining };
    }
}
const todoList = new TodoList();
todoList.add("Купить компуктер");
todoList.add("Сходить в Мак");
todoList.add("Выучить JavaScript =/");
todoList.edit(0, "Купить молоко и хлеб");
// Отмечаю заметку как выполненную
todoList.markAsCompleted(1);
console.log("Все заметки:", todoList.getAll());
console.log("Статистика:", todoList.getStats())
console.log("Поиск по названию 'купить':", todoList.findByName("купить"));
console.log("Сортировка по статусу:", todoList.sortByStatus());
console.log("Сортировка по дате:", todoList.sortByDate());
