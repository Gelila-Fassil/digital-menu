export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export type MenuCategory = {
  id: string
  name: string
  items: MenuItem[]
}
