export interface CreateUserDTO {
  name: string
  email: string
  passwordHash: string
}

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
}

export interface UsersRepository {
  create(data: CreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findMany(): Promise<User[]>
}
