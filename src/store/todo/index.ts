import { InjectionKey, reactive, readonly } from 'vue'
import { Todo, TodoState, TodoStore, Params } from '@/store/todo/types'

// モックデータ
const mockTodo: Todo[] = [
  {
    id: 1,
    title: 'todo1',
    description: '1つ目',
    status: 'waiting',
    createdAt: new Date('2020-12-01'),
    updatedAt: new Date('2020-12-01')
  },
  {
    id: 2,
    title: 'todo2',
    description: '2つ目',
    status: 'waiting',
    createdAt: new Date('2020-12-02'),
    updatedAt: new Date('2020-12-02')
  },
  {
    id: 3,
    title: 'todo3',
    description: '3つ目',
    status: 'working',
    createdAt: new Date('2020-12-03'),
    updatedAt: new Date('2020-12-04')
  }
]

const state = reactive<TodoState>({
  todos: mockTodo
})

function initializeTodo (todo: Params) {
  const date = new Date()
  return {
    id: date.getTime(),
    title: todo.title,
    description: todo.description,
    status: todo.status,
    createdAt: date,
    updatedAt: date
  } as Todo
}
const getTodo = (id: number) => {
  const todo = state.todos.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error(`Cannot find by id: ${id}`)
  }
  return todo
}

const addTodo = (todo: Params) => {
  state.todos.push(initializeTodo(todo))
}

const updateTodo = (id: number, todo: Todo) => {
  const index = state.todos.findIndex((todo) => todo.id === id)
  if (index === -1) {
    throw new Error(`cannot find todo by id:${id}`)
  }
  state.todos[index] = todo
}

const deleteTodo = (id: number) => {
  state.todos = state.todos.filter((todo) => todo.id !== id)
}

const todoStore: TodoStore = {
  state: readonly(state),
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo
}

export default todoStore

export const todoKey: InjectionKey<TodoStore> = Symbol('todo')
