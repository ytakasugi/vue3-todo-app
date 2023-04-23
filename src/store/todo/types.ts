import { DeepReadonly } from 'vue'

// 共用体型
export type Status = 'waiting' | 'working' | 'completed' | 'pending'
/**
 * Pick<T, Keys>は、型TからKeysに指定したキーだけを含むオブジェクト型を返すユーティリティ型
 * 以下と同義
 * ```ts
 * type Params = {
 *   title: string;
 *    description: string;
 *    status: Status;
 * }
 * ```
*/
export type Params = Pick<Todo, 'title' | 'description' | 'status'>

// インターフェース
export interface Todo {
    id: number
    title: string
    description: string
    status: Status
    createdAt: Date
    updatedAt: Date
}

export interface TodoState {
    todos: Todo[]
}

export interface TodoStore {
    state: DeepReadonly<TodoState>
    getTodo: (id: number) => void
    addTodo: (todo: Params) => void
    updateTodo: (id: number, todo: Todo) => void
    deleteTodo: (id: number) => void
  }
