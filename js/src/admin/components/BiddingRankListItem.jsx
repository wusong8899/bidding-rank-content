import Component from "flarum/Component";
import Button from 'flarum/components/Button';
import BiddingRankDeleteModal from './BiddingRankDeleteModal';
import username from "flarum/helpers/username";

export default class BiddingRankListItem extends Component {

  view() {
    const {biddingRankListItem,_rankID} = this.attrs;
    const bidValue = biddingRankListItem.attribute("bid");
    const bidUser = biddingRankListItem.fromUser();
    const bidContent = biddingRankListItem.content();
    const bidTitle = biddingRankListItem.title();

    return (
      <div className="biddingRankSettingContainer">
        <div style="float:right">
          {Button.component({
            style: "font-weight:bold;",
            className: 'Button Button--danger',
            onclick: () => {
              this.deleteItem(biddingRankListItem)
            }
          },
          app.translator.trans('wusong8899-bidding-rank.admin.delete')
          )}
        </div>
        <div>
          <b>{app.translator.trans('wusong8899-bidding-rank.admin.bidding-rank-list-username')}: </b>
          {username(bidUser)}&nbsp;|&nbsp;
          <b>{app.translator.trans('wusong8899-bidding-rank.admin.bidding-rank-list-title')}: </b>
          {bidTitle}&nbsp;|&nbsp;
          <b>{app.translator.trans('wusong8899-bidding-rank.admin.bidding-rank-list-bid')}: </b>
          {bidValue}
        </div>
        <div>
          <b>{app.translator.trans('wusong8899-bidding-rank.admin.bidding-rank-list-content')}: </b>
          {bidContent}
        </div>
      </div>
    );
  }

  deleteItem(biddingRankListItem){
    app.modal.show(BiddingRankDeleteModal, {biddingRankListItem});
  }
}
