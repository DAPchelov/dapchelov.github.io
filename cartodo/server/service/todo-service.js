import CardsListModel from '../models/cardsList-model';
import CardsDto from '../dtos/cards-dto';

// array.find() and .filter() don`t work. Some bicycles for your attention!
const findElementById = (array, id) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return (array[i]);
        }
    }
}
const filterArrayById = (array, id) => {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].id !== id) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

class TodoService {
    async removeTodo(reqUserId, cardId, todoId) {
        
        let newTodos = [];
        await CardsListModel.findOne({ userId: reqUserId }).then((event) => {
            const cardsListDto = new CardsDto(event);
            const card = findElementById(cardsListDto.cards, cardId);
            newTodos = filterArrayById(card.todos, todoId);
        });

        await CardsListModel.updateOne({ userId: reqUserId, 'cards._id': cardId }, { $set: { 'cards.$.todos': newTodos } });
    }
    // may adapt to work with cards
    // async setTodoCompleted(reqUserId, todoId, isCompleted) {
    //     await CardsListModel.updateOne({ userId: reqUserId, 'todos._id': todoId }, {$set: {'todos.$.isCompleted': isCompleted}});
    // }

};

export default new TodoService();