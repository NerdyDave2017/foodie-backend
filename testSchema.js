const testSchema = {
  users: {
    _id: ObjectId(),
    name: String,
    email: String,
    password: String,
    role: String, // one of "driver", "user", "merchant", "admin"
  },
  orders: {
    _id: ObjectId(),
    user_id: ObjectId(), // references the _id field in the users collection
    items: [
      {
        item_id: ObjectId(), // references the _id field in the items collection
        quantity: Number,
        price: Number,
      },
    ],
    total_price: Number,
    status: String, // one of "pending", "in_progress", "delivered"
  },
  items: {
    _id: ObjectId(),
    name: String,
    price: Number,
    merchant_id: ObjectId(), // references the _id field in the users collection for the merchant who added this item
  },
};

const testSchema2 = {
  _id: ObjectId("5f36d49a2b45b021c09ce45b"),
  deliveryId: "DELIVERY001",
  customerName: "John Doe",
  customerPhone: "+1 555 555 5555",
  customerAddress: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  },
  restaurantName: "Papa John's Pizza",
  restaurantPhone: "+1 222 222 2222",
  items: [
    { name: "Large Cheese Pizza", quantity: 1, price: 12.99 },
    { name: "Breadsticks", quantity: 1, price: 4.99 },
    { name: "2-liter Coke", quantity: 1, price: 2.99 },
  ],
  totalPrice: 20.97,
  status: "in-transit",
  deliveryPerson: {
    name: "Jane Smith",
    phone: "+1 333 333 3333",
  },
  deliveryStartTime: ISODate("2022-12-17T14:30:00Z"),
  deliveryEndTime: ISODate("2022-12-17T15:00:00Z"),
};
