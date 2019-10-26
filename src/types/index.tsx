export type FormElem = React.FormEvent<HTMLFormElement>;

export interface ITodo {
    text: string;
    completed: boolean;
}

export interface ITodoListProps {
    todos: ITodo[];
    completedTodo: (index: number) => void;
    removeTodo: (index: number) => void;
}