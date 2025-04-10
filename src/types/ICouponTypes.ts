export interface ICouponType {
    _id: string
    code: string
    discountType: "PERCENTAGE"|"FIXED_AMOUNT"|""
    discountValue: number
    maxDiscountAmount: number
    minOrderAmount: number
    expiryDate:  Date
    startDate:  Date
    usageLimit: number
    isActive: boolean
    applicableToAll: boolean
    applicableStores: string[]
    applicableSellers: string[]
    applicableCategories: string[]
    applicableProducts: string[]
    applicablePurchaseType: "ALL"|"FIRST_PURCHASE"|"REPEAT_CUSTOMER"|"BULK_PURCHASE"
    minPurchaseCount: number
    minPurchaseAmountThreshold: number
    maxUsagePerUser: number
    createdBy: string
    dbModel: string
    coupon_owner: string
    createdAt: string
    updatedAt: string
    __v: number
  }


