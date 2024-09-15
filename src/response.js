const responseData = {
  status: "OK",
  res: {
    "title": "Water Footprint Data",
    "query": "Water footprint of apples",
    "results": [
      {
        "item": "Apple",
        "waterFootprint": "822 liters per kg",
        "description": "The water footprint of an apple is approximately 822 liters for every kilogram produced. This accounts for both direct water consumption and virtual water used in the production process."
      },
      {
        "item": "Banana",
        "waterFootprint": "790 liters per kg",
        "description": "Bananas require around 790 liters of water per kilogram. This includes water needed for irrigation, growth, and processing."
      },
      {
        "item": "Avocado",
        "waterFootprint": "2726 liters per kg",
        "description": "Avocados have a significantly high water footprint, requiring about 2726 liters per kilogram."
      }
    ]
  }
};

export default responseData;
