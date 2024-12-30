export interface IUserTypes {
    _id: string
    name: string
    email: string
    password: string
    role: "admin"|"ecommerce"|"social-media"
    pages: string[]
  }