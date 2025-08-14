import app from 'flarum/forum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class BiddingRankContentSubmitSuccessModal extends Modal {
  static isDismissibleViaBackdropClick = false;
  static isDismissibleViaCloseButton = true;

  oninit(vnode) {
    super.oninit(vnode);
  }

  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans('wusong8899-bidding-rank.forum.submit-content-success');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group" style="text-align: center;">
            {Button.component(
              {
                className: 'Button Button--primary',
                loading: this.loading,
                onclick: () => {
                  location.reload();
                },
              },
              app.translator.trans('wusong8899-bidding-rank.forum.ok')
            )}
          </div>
        </div>
      </div>
    );
  }
}
