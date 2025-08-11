import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class DecorationStoreDeleteModal extends Modal {
  static isDismissibleViaBackdropClick = false;
  static isDismissibleViaCloseButton = true;

  oninit(vnode) {
    super.oninit(vnode);
    this.biddingRankListItem = this.attrs.biddingRankListItem;
    this.loading = false;
  }

  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans('wusong8899-bidding-rank.admin.delete-confirmation');
  }

  content() {
    //
    return (
      <div className="Modal-body">
        <div className="Form-group" style="text-align: center;">
          {Button.component(
            {
              className: 'Button Button--primary',
              type: 'submit',
              loading: this.loading,
            },
            app.translator.trans('wusong8899-decoration-store.lib.confirm')
          )}&nbsp;
          {Button.component(
            {
              className: 'Button',
              loading: this.loading,
              onclick: () => {
                this.hide();
              }
            },
            app.translator.trans('wusong8899-decoration-store.lib.cancel')
          )}
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;
    this.biddingRankListItem.save({
      isDelete:1,
    })
    .then(
      () => location.reload(),
      (response) => {
        this.loading = false;
      }
    );
  }
}
