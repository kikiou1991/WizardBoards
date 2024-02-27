const myArray = [
  { title: "Object 1", position: 1, index: 1 },
  { title: "Object 4", position: 2, index: 4 },
  { title: "Object 2", position: 3, index: 2 },
  { title: "Object 3", position: 4, index: 3 },
  { title: "Object 5", position: 5, index: 5 },
  // Add more objects as needed
];

//we want to move object 5 to position 2
//so we replace objects 5`s position with object 2`s position
//next we must replace object 2`s position with the next object`s position
//and so on until we reach the last object
