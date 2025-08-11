import Component from "flarum/Component";
import Link from "flarum/components/Link";
import BiddingRankContentDetailsModal from './BiddingRankContentDetailsModal';
import BiddingRankContentSubmitModal from './BiddingRankContentSubmitModal';

export default class BiddingRankContentListItem extends Component {
  view() {
    const {biddingRankListItem,rankID} = this.attrs;
    const moneyName = app.forum.attribute('antoinefr-money.moneyname') || '[money]';
    const bidValue = biddingRankListItem.attribute("bid");
    const bidUser = biddingRankListItem.fromUser();
    const bidURL = biddingRankListItem.url();
    const bidContent = biddingRankListItem.content();
    const bidTitle = biddingRankListItem.title();
    const bidText = moneyName.replace('[money]', bidValue);

    let userBidText = "";

    if(app.session.user){
      let userID = app.session.user.id();

      if(userID==bidUser.id()){
        userBidText = app.translator.trans('wusong8899-money-leaderboard.forum.user-own-bid');
      }
    }

    let listItemStyle = rankID%2===1?"background: #1b2132;":"";

    if(userBidText!==""){
      listItemStyle = "background: royalblue;";
    }

    return (
      <div className="BiddingRankListItemContainer" style={listItemStyle} onclick={() => this.itemClicked(biddingRankListItem,bidUser.id())}>
        <div style="width: 40% !important;" className="BiddingRankListHeaderContent">
          <div>{bidTitle}</div>
        </div>
        <div style="width: 60% !important;;text-align: right !important;" className="BiddingRankListHeaderMoney">
          {bidValue}
          <i className="u-sprites-money u-sprites-currency u-sprites-currency-cny" style="margin-left: 4px;"></i>
        </div>
      </div>
    );
  }

  itemClicked(biddingRankListItem,bidUserID){
    if(app.session.user){
      let userID = app.session.user.id();

      if(userID==bidUserID){
        this.editContent(biddingRankListItem);
      }else{
        this.showDetails(biddingRankListItem);
      }
    }else{
        this.showDetails(biddingRankListItem);
    }
  }

  showDetails(biddingRankListItem){
    app.modal.show(BiddingRankContentDetailsModal, {biddingRankListItem});
  }

  editContent(itemData){
    app.modal.show(BiddingRankContentSubmitModal,{itemData});
  }
}
