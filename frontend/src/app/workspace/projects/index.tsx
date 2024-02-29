const objectsArray: { name: string; position: number; index: string }[] = [
  { name: "Object 1", position: 1, index: "A" },
  { name: "Object 2", position: 2, index: "D" },
  { name: "Object 3", position: 2, index: "B" }, //3
];

//if the cards position is less than the original position of the removed card, we increment

//indexes we need to keep track of:
//original index of the removed card - so we can update every card up until that position, including the new card in that position
//the index of the destination card - so we know where to insert the removed card

//grab the id of removed card pos
//next we find the position of the destination card
//we assign the position of the destination card to the removed card obj 2 pos becomes 1
//we increment the position of the destination card object 3 pos becomes 2
//then we increment the position of the card after the destination card object 1 pos becomes 3
//until we reach the position where the original card was removed from, but we still increment that one, so in this case object 1`s position becomes 4
