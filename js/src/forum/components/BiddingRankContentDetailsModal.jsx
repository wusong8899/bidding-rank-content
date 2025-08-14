import app from 'flarum/forum/app';
import Modal from 'flarum/components/Modal';
import avatar from "flarum/helpers/avatar";

export default class BiddingRankContentDetailsModal extends Modal {
  static isDismissibleViaBackdropClick = false;
  static isDismissibleViaCloseButton = true;

  oninit(vnode) {
    super.oninit(vnode);
    this.biddingRankListItem = this.attrs.biddingRankListItem;
  }

  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans('wusong8899-bidding-rank.forum.bidding-rank-details-title');
  }

  content() {
    const moneyName = app.forum.attribute('antoinefr-money.moneyname') || '[money]';
    const bidValue = this.biddingRankListItem.attribute("bid");
    const bidUser = this.biddingRankListItem.fromUser();
    const bidURL = this.biddingRankListItem.url();
    const bidContent = this.biddingRankListItem.content();
    const _bidText = moneyName.replace('[money]', bidValue);

    // Use standard Flarum helpers as fallbacks for decoration-store components
    const userAvatar = avatar(bidUser);

    return (
      <div className="Modal-body">
        <div style="min-height: 50px;" onclick={() => this.openURL(bidURL) }>
          <div style="float:left">{userAvatar}</div>
          <div style="padding-left: 70px;">
            <div>{bidContent}</div>
            <div style="padding-top: 10px;">{bidURL}</div>
          </div>
        </div>
      </div>
    );
  }

  openURL(bidURL) {
    window.open(bidURL, '_blank').focus();
  }
}
