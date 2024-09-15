export class Task {
    constructor(
        id = null,
        name = '',
        description = '',
        date = '',               // Data no formato ISO
        startTime = '',          // Hora de início no formato ISO
        endTime = '',            // Hora de término no formato ISO
        completed = false,
        favorite = false,
        tags = [],               // Array de objetos
        mensagem = '',           // Mensagem
        emoji = ''               // Emoji
    ) {
        this.id = id;
        this.name = name || '';
        this.description = description || '';
        this.date = date || '';              // Data no formato ISO
        this.startTime = startTime || '';    // Hora de início no formato ISO
        this.endTime = endTime || '';        // Hora de término no formato ISO
        this.completed = completed;
        this.favorite = favorite;
        this.tags = tags;
        this.mensagem = mensagem || '';
        this.emoji = emoji || '';
    }

    toPlainObject() {
        return {
            name: this.name,
            description: this.description,
            date: this.date,                // Data no formato ISO
            startTime: this.startTime,      // Hora de início no formato ISO
            endTime: this.endTime,          // Hora de término no formato ISO
            completed: this.completed,
            favorite: this.favorite,
            tags: this.tags,
            mensagem: this.mensagem,
            emoji: this.emoji
        };
    }
}
