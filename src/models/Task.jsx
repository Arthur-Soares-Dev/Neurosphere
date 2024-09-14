export class Task {
    constructor(
        id = null,
        name = '',
        description = '',
        date = '',
        startTime = '',
        endTime = '',
        completed = false,
        favorite = false,
        tags = [] // Array de objetos
    ) {
        this.id = id;
        this.name = name || '';
        this.description = description || '';
        this.date = date || '';
        this.startTime = startTime || '';
        this.endTime = endTime || '';
        this.completed = completed;
        this.favorite = favorite;
        this.tags = tags;
    }

    toPlainObject() {
        return {
            name: this.name,
            description: this.description,
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            completed: this.completed,
            favorite: this.favorite,
            tags: this.tags
        };
    }
}