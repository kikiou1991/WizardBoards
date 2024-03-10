const objectsArray = [
  { name: "Object 3", position: 1, index: "B" },
  { name: "Object 1", position: 2, index: "A" },
  { name: "Object 1", position: 3, index: "A" },
];
const newArray = [
  { name: "Object 3", position: 1, index: "B" },
  { name: "Object 2", position: 2, index: "B" },
  { name: "Object 4", position: 3, index: "B" },
  { name: "Object 5", position: 4, index: "B" },
];

function moveCard(newArray, objectsArray, cardName, insertAfter) {
  const cardToMove = newArray.find((card) => card.name === cardName);
  const insertIndex =
    objectsArray.findIndex((card) => card.name === insertAfter) + 1;

  if (cardToMove) {
    // Update positions in newArray
    newArray.forEach((card) => {
      if (card.position >= cardToMove.position) {
        card.position += 1;
      }
    });

    // Update positions in objectsArray
    objectsArray.splice(insertIndex, 0, {
      ...cardToMove,
      position: insertIndex,
    });

    // Update positions after the inserted card
    for (let i = insertIndex + 1; i < objectsArray.length; i++) {
      objectsArray[i].position += 1;
    }

    // Remove the card from newArray
    newArray.splice(newArray.indexOf(cardToMove), 1);
  }
}

// Usage:
const result = moveCard(newArray, objectsArray, "Object 2", "Object 3");
console.log(result);
//test for card movement tracking and position
