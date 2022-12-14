declare module './components/Todo'

export interface Todo {
    text: string
    id: number
    complete: boolean
}

export interface TodoProps extends Todo {
    dispatch: React.Dispatch<TodoAction>
    last: boolean
}

export type TodoAction =
{
    type: 'add'
    content: Todo
} | 
{
    type: 'remove'
    id: number
} | 
{
    type: 'empty'
} | 
{
    type: 'update'
    id: number
    complete: boolean
}