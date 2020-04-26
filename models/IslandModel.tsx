
export default class IslandModel {
  id?: String;
  islandOwner?: String;
  location?: String;
  hashTagDescription?: String;
  createTime?: String;

  constructor(id?: String, islandOwner?: String, location?: String, hashTagDescription?: String, createTime?: String) {
  	this.id = id;
  	this.islandOwner = islandOwner;
  	this.location = location;
  	this.hashTagDescription = hashTagDescription;
  	this.createTime = createTime;
  }

}