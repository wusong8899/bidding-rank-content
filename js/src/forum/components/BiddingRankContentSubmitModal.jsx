import app from 'flarum/forum/app';
import Modal from 'flarum/components/Modal';
import Stream from 'flarum/utils/Stream';
import Button from 'flarum/components/Button';
import Alert from 'flarum/common/components/Alert';
import BiddingRankContentSubmitSuccessModal from './BiddingRankContentSubmitSuccessModal';
import BiddingRankContentEditSuccessModal from './BiddingRankContentEditSuccessModal';

export default class BiddingRankContentSubmitModal extends Modal {
  static isDismissibleViaBackdropClick = false;
  static isDismissibleViaCloseButton = true;

  oninit(vnode) {
    super.oninit(vnode);
    this.itemData = this.attrs.itemData;
    this.settingType = "add";
    this.loading = false;

    if(this.itemData){
      this.settingType = "edit";
      this.bid = Stream(this.itemData.bid());
      this.url = Stream(this.itemData.url());
      this.bidContent = Stream(this.itemData.content());
      this.bidTitle = Stream(this.itemData.title());
      this.bidRaise = Stream(0);
    }else{
      this.bid = Stream(10000);
      this.url = Stream("");
      this.bidTitle = Stream("");
      this.bidContent = Stream("");
    }
  }

  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans(this.settingType==="add"?'wusong8899-bidding-rank.forum.submit-content':'wusong8899-bidding-rank.forum.edit-content');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group" style="text-align: center;">

              {this.settingType==="add" && (
                <div>
                  <div className="BiddingRankDataLabel">{app.translator.trans('wusong8899-bidding-rank.forum.bidding-rank-list-bid')}</div>
                  <input type="number" min="10000" disabled={this.loading} required className="FormControl" bidi={this.bid} />
                </div>
              )}

              {this.settingType==="edit" && (
                <div>
                  <div className="BiddingRankDataLabel">{app.translator.trans('wusong8899-bidding-rank.forum.bidding-rank-list-bid')}: {this.bid()}</div>
                  <div className="BiddingRankDataLabel">{app.translator.trans('wusong8899-bidding-rank.forum.bidding-rank-list-bid-raise')}</div>
                  <input type="number" min="0" disabled={this.loading} required className="FormControl" bidi={this.bidRaise} />
                </div>
              )}

              <div className="BiddingRankDataLabel">{app.translator.trans('wusong8899-bidding-rank.forum.bidding-rank-list-title')}</div>
              <input maxlength="6" disabled={this.loading} required className="FormControl" bidi={this.bidTitle} />

              <div className="BiddingRankDataLabel">{app.translator.trans('wusong8899-bidding-rank.forum.bidding-rank-list-url')}</div>
              <input maxlength="500" disabled={this.loading} required className="FormControl" bidi={this.url} />

              <div className="BiddingRankDataLabel">{app.translator.trans('wusong8899-bidding-rank.forum.bidding-rank-list-content')}</div>
              <textarea maxlength="500" disabled={this.loading} required className="FormControl" bidi={this.bidContent} />
          </div>

          <div className="Form-group" style="text-align: center;">
            {Button.component(
              {
                className: 'Button Button--primary',
                type: 'submit',
                loading: this.loading,
              },
              app.translator.trans('wusong8899-guaguale.forum.guaguale-purchase-confirm')
            )}&nbsp;
            {Button.component(
              {
                className: 'Button',
                loading: this.loading,
                onclick: () => {
                  this.hide();
                }
              },
              app.translator.trans('wusong8899-guaguale.forum.guaguale-purchase-cancel')
            )}
          </div>
        </div>
      </div>
    );
  }


  onsubmit(e) {
    e.preventDefault();

    const userMoney = app.session.user.attribute("money");

    if(this.settingType==="add" && userMoney<this.bid()){
      app.alerts.show(Alert, {type: 'error'}, app.translator.trans('wusong8899-bidding-rank.forum.insufficient-fund'));
      return;
    }

    if(this.settingType==="edit" && userMoney<this.bidRaise()){
      app.alerts.show(Alert, {type: 'error'}, app.translator.trans('wusong8899-bidding-rank.forum.insufficient-fund'));
      return;
    }

    this.loading = true;

    if(this.settingType==="edit"){
      this.itemData.save({
        bidRaise:this.bidRaise(),
        url:this.url(),
        content:this.bidContent(),
        title:this.bidTitle()
      })
      .then(
        () => {
          this.loading = false;
          app.modal.show(BiddingRankContentEditSuccessModal);
        }
      )
      .catch(() => {
        this.loading = false;
      });
    }else{
      app.store
      .createRecord("biddingRankList")
      .save({
        bid:this.bid(),
        url:this.url(),
        content:this.bidContent(),
        title:this.bidTitle()
      })
      .then(
        (result) => {
          app.store.pushPayload(result);
          app.session.user.data.attributes.money-=this.bid();
          this.loading = false;
          app.modal.show(BiddingRankContentSubmitSuccessModal);
        }
      )
      .catch(() => {
        this.loading = false;
      });
    }
  }
}
