let card = JSON.parse(localStorage.getItem("card")) || [];
let randomNumber;

function saveCards() {
  localStorage.setItem("card", JSON.stringify(card));
}

function toGenerate() {
  randomNumber = Math.floor(Math.random() * 20000000000);
  console.log("Generate clicked, number:", randomNumber);
  document.getElementById("codeInput").value = randomNumber;
}

function toSave() {
  let network = document.getElementById("network").value;
  let amount = document.getElementById("amount").value;
  console.log("Save clicked:", network, amount, randomNumber);

  if (randomNumber === undefined) {
    alert("Generate a code first");
    return;
  }

  let users = {
    network: network,
    amount: amount,
    pin: "",
    status: "unused",
    dateCreated: new Date().toLocaleDateString("en-US"),
    dateUsed: "Not used yet",
  };

  if (network == "MTN") {
    users.pin = `*555*${randomNumber}#`;
  } else if (network == "GLO") {
    users.pin = `*777*${randomNumber}#`;
  } else if (network == "AIRTEL") {
    users.pin = `*123*${randomNumber}#`;
  } else if (network == "9MOBILE") {
    users.pin = `*999*${randomNumber}#`;
  }

  card.push(users);
  saveCards();
  console.log("Card array:", card);

  document.getElementById("codeInput").value = "";
  randomNumber = undefined;

  updateTable();
}

function updateTable() {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  card.forEach((items, index) => {
    const { network, amount, pin, status, dateCreated, dateUsed } = items;

    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${network}</td>
        <td>#${amount}</td>
        <td>${pin}</td>
        <td>${status}</td>
        <td>${dateCreated}</td>
        <td>${dateUsed}</td>
        <td><button onclick="del(${index})">delete</button></td>
      </tr>
    `;
  });

  console.log("Table updated, rows:", card.length);
}

function canRecharge() {
  let pin = document.getElementById("pinInput").value.trim();
  console.log("Recharge clicked, pin entered:", pin);

  let check = card.findIndex((items) => items.pin == pin);
  console.log("Index found (-1 means not found):", check);

  if (check === -1) {
    alert("Pin not found!");
    return;
  }

  if (card[check].status == "used") {
    alert("Pin has already been used!");
    return;
  }

  card[check].status = "used";
  card[check].dateUsed = new Date().toLocaleDateString("en-US");
  saveCards();
  console.log("Card after recharge:", card[check]);

  alert("Recharge Successful!");
  document.getElementById("pinInput").value = "";
  updateTable();
}

function del(index) {
  console.log("Deleting:", card[index]);
  card.splice(index, 1);
  saveCards();
  updateTable();
}

updateTable();