import Model from "flarum/Model";

export default class BiddingRank extends Model {}
Object.assign(BiddingRank.prototype, {
  id: Model.attribute("id"),
  title: Model.attribute("title"),
  content: Model.attribute("content"),
  user_id: Model.attribute("user_id"),
  url: Model.attribute("url"),
  bid: Model.attribute("bid"),
  fromUser: Model.hasOne("fromUser"),
});
