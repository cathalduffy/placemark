export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      scope: "admin",
      password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      scope: "user",
      password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      scope: "user",
      password: "$2a$10$uqnPlgyVjBEOtcgMhn/WRO3FwW4T9gX36tTB4RqpGeB/LkCR3YQuO",
    },
  },
  categories: {
    _model: "Category",
    beach: {
      title: "Beach",
    },
    mountain: {
      title: "Mountain",
    },
  },
  placemark: {
    _model: "Placemark",
    Tramore: {
      name: "Tramore",
      latitude: 52.161435,
      longitude: -7.149295,
      categoryid: "->categories.beach"
    },
    Dunmore: {
      name: "Dunmore",
      latitude: 52.152767,
      longitude: -6.994804,
      categoryid: "->categories.beach"
    },
    Sugarloaf: {
      name: "Sugarloaf",
      latitude: 51.7258333,
      longitude: -9.6311111,
      categoryid: "->categories.mountain"
    },
  }
};
