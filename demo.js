'use strict'
//オブジェクトで在庫品を設定
let inventory = [
  { name: 'チップ', stock: 100, desired: 50, received: 0, shipped: 0 },
  { name: '仕上げ刃具', stock: 200, desired: 100, received: 0, shipped: 0 },
  { name: 'ヘリカル刃具', stock: 150, desired: 75, received: 0, shipped: 0 }
];
//在庫の表示
function showInventory() {
  let table = document.getElementById('inventory-table');
  table.innerHTML = `
    <tr>
      <th>商品名</th>
      <th>在庫数</th>
      <th>欲しい数</th>
      <th>入庫</th>
      <th>出庫</th>
      <th>欲しい数変更</th>
    </tr>`;
  inventory.forEach(item => {
    let row = document.createElement('tr');
    let stockClass = item.stock >= 20 ? 'green' : item.stock >= 1 ? 'yellow' : 'red';
    row.innerHTML = `
      <td>${item.name}</td>
      <td class="${stockClass}">${item.stock}</td>
      <td>${item.desired}</td>
      <td><button onclick="showReceiveInput('${item.name}')">入庫</button></td>
      <td><button onclick="showShipInput('${item.name}')">出庫</button></td>`;
    row.innerHTML += `<td><button onclick="showDesiredInput('${item.name}')">変更</button></td>`;
    table.appendChild(row);
  });
}
//在庫情報の更新
function updateStock() {
  inventory.forEach(item => {
    item.stock = item.stock + item.received - item.shipped;
    item.received = 0;
    item.shipped = 0;
    console.log(`${item.name}の在庫数を${item.stock}に更新しました。`);
  });
  showInventory();
}
//在庫の入庫
function receiveItem(name, quantity) {
  let item = inventory.find(item => item.name === name);
  if (item) {
    item.received += parseInt(quantity);
    console.log(`${name}を${quantity}個入庫しました。`);
    updateStock();
  } else {
    console.log(`${name}は見つかりませんでした。`);
  }
}
//出庫とエラー表示
function shipItem(name, quantity) {
  let item = inventory.find(item => item.name === name);
  if (item) {
    if (item.stock >= quantity) {
      item.shipped += parseInt(quantity);
      console.log(`${name}を${quantity}個出庫しました。`);
      updateStock();
    } else if (item.stock === 0) {
      alert(`${name}の在庫がありません。`);
    } else if (quantity > item.stock) {
      alert(`出庫する数量が在庫数より多いです。`);
    } else {
      console.log(`${name}の在庫が不足しています。`);
    }
  } else {
    console.log(`${name}は見つかりませんでした。`);
  }
}
//欲しい部品の更新
function updateDesired(name, quantity) {
  let item = inventory.find(item => item.name === name);
  if (item) {
    item.desired = parseInt(quantity);
    console.log(`${name}の欲しい数を${quantity}に更新しました。`);
    showInventory();
  } else {
    console.log(`${name}は見つかりませんでした。`);
  }
}
//入庫する数量を入力する
function showReceiveInput(name) {
  let quantity = prompt(`入庫する${name}の数量を入力してください`);
  if (quantity !== null) {
    receiveItem(name, quantity);
  }
}
//出庫する数量を入力する
function showShipInput(name) {
  let quantity = prompt(`出庫する${name}の数量を入力してください`);
  if (quantity !== null) {
    shipItem(name, quantity);
  }
}
//新しい欲しい数を入力するためのプロンプトを表示する
function showDesiredInput(name) {
  let quantity = prompt(`欲しい数を入力してください`);
  if (quantity !== null) {
    updateDesired(name, quantity);
  }
}
//在庫情報を表示
showInventory();
