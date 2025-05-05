export interface ICouriers{
    _id: string
    name: string
    logo: string
    price_per_kg: number
    price_per_bundle: number
    min_weight: number
    is_min_price_enabled: boolean
    package_dimension: PackageDimension
    is_door_delivery: boolean
    is_topay: boolean
    deliverable_area: string[]
    createdAt: string
    updatedAt: string
    __v: number
    is_enabled: boolean
  }
  
  export interface PackageDimension {
    _id: string
  }
  