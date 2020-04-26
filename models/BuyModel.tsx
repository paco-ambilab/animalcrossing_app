
export default class BuyModel {
  id?: String;
  itemName?: String;
  unitPrice?: String;
  numberOfItem?: String;
  islandPassCode?: String;
  createTime?: String;

  constructor(id?: String, itemName?: String, unitPrice?: String, numberOfItem?: String, islandPassCode?: String, createTime?: String) {
  	this.id = id
  	this.itemName = itemName;
  	this.unitPrice = unitPrice;
  	this.numberOfItem = numberOfItem;
  	this.islandPassCode = islandPassCode;
	this.createTime = createTime;
  }

}