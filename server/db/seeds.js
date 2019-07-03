use hotel;
db.dropDatabase();

db.bookings.insertMany([
  {
    name: "John",
    email: "john@gmail.com",
    status: true
  },
  {
    name: "Dave",
    email: "davvy@yahoo.com",
    status: true
  },
  {
    name: "Kate",
    email: "kt.j@hotmail.co.uk",
    status: false
  }
]);
