import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import LoadingIndicator from "flarum/components/LoadingIndicator";
import Button from 'flarum/components/Button';

import BiddingRankContentListItem from "./BiddingRankContentListItem";
import BiddingRankContentSubmitModal from './BiddingRankContentSubmitModal';
import LogInModal from "flarum/components/LogInModal";

export default class BiddingRankContentIndexPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
    this.moreResults = false;
    this.biddingRankList = [];
    this.hasBid = false;
    this.biddingRankHistoryData = {};

    this.loadResults();
  }

  view() {
    let loading;
    let rankID = 0;

    if(this.loading){
      loading = LoadingIndicator.component({size: "large"});
    }

    return (
      <div className="MoneyLeaderboardPage">
        {IndexPage.prototype.hero()}

        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
            </nav>

            <div className="BiddingRangContainer">
              <div className="BiddingRankListTitle selectTitle" style="height:40px;padding-top: 0px!important;;padding-bottom: 0px !important;">
                <div class="switch-btns"><div class="btns-container"><button style="width: 106px;" type="button" class="u-btn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExNzJCMjFGQ0I0QzExRUM5QTI1RDZDNkEyRTk2MDREIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjExNzJCMjIwQ0I0QzExRUM5QTI1RDZDNkEyRTk2MDREIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTE3MkIyMURDQjRDMTFFQzlBMjVENkM2QTJFOTYwNEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTE3MkIyMUVDQjRDMTFFQzlBMjVENkM2QTJFOTYwNEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6TWgg5AAAL4UlEQVR42tRZC3QU5RW+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" style="width: 15px;margin-right: 4px;vertical-align: -2px;" /><div class="u-btn-text">{app.translator.trans("wusong8899-bidding-rank.forum.bidding-rank-content")}</div></button><div id="buttonSelectedBackground" class="selected-bg" style="left: 0px; top: 0px; opacity: 1;"></div></div></div>
              </div>
              <div style="display: flex;position: fixed;bottom: 50px;z-index: 1;width: 100%;">
                {!this.loading && this.hasBid===false && (
                  <Button style="position: absolute;right: 25px;font-weight: normal !important;background: #e6601b !important;" className={'Button Button--primary'} onclick={() => this.submitContent()}>
                    {app.translator.trans("wusong8899-bidding-rank.forum.submit-content")}
                  </Button>
                )}

                {!this.loading && this.hasBid===true && (
                  <Button style="position: absolute;right: 25px;font-weight: normal !important;background: #e6601b !important;" className={'Button Button--primary'} onclick={() => this.editContent()}>
                    {app.translator.trans("wusong8899-bidding-rank.forum.edit-content")}
                  </Button>
                )}
              </div>

              <div class="BiddingRankListHeader">
                <div class="BiddingRankListHeaderContent" style="padding-left: 8px;">{app.translator.trans("wusong8899-bidding-rank.forum.bidding-rank-list-title")}</div>
                <div class="BiddingRankListHeaderMoney" style="margin-left: -5px;color:white !important">{app.translator.trans("wusong8899-bidding-rank.forum.bidding-rank-list-bid")}</div>
              </div>

              <div className="BiddingRankList">
                {this.biddingRankList.map((biddingRankListItem) => {
                  rankID++;

                  return (
                    <div className="BiddingRankListItems">
                      {BiddingRankContentListItem.component({ biddingRankListItem, rankID })}
                    </div>
                  );
                })}
              </div>

              {!this.loading && this.biddingRankList.length===0 && (
                <div>
                  <div style="font-size:1.4em;color: var(--muted-more-color);text-align: center;height: 300px;line-height: 100px;">{app.translator.trans("wusong8899-bidding-rank.forum.list-empty")}</div>
                </div>
              )}

              {!loading && this.hasMoreResults() && (
                <div style="text-align:center;padding:20px">
                  <Button className={'Button Button--primary'} disabled={this.loading} loading={this.loading} onclick={() => this.loadMore()}>
                    {app.translator.trans('wusong8899-money-leaderboard.forum.leaderboard-load-more')}
                  </Button>
                </div>
              )}

              {loading && <div className="MoneyLeaderboard-loadMore">{loading}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  submitContent(){
    if(app.session.user){
      app.modal.show(BiddingRankContentSubmitModal);
    }else{
      app.modal.show(LogInModal);
    }
  }

  editContent(){
    const itemData = this.biddingRankHistoryData;
    app.modal.show(BiddingRankContentSubmitModal,{itemData});
  }

  hasMoreResults() {
    return this.moreResults;
  }

  loadMore() {
    this.loading = true;
    this.loadResults(this.biddingRankList.length);
  }

  parseResults(results) {
    this.moreResults = !!results.payload.links && !!results.payload.links.next;
    [].push.apply(this.biddingRankList, results);
    this.loading = false;
    m.redraw();

    return results;

    // return app.store
    //   .find("biddingRankHistory")
    //   .catch(() => {})
    //   .then((result) => {
    //     this.hasBid = result.length>0;
        
    //     if(this.hasBid){
    //       this.biddingRankHistoryData = result[0];
    //     }

    //     this.loading = false;
    //     m.redraw();

    //     return results;
    //   });
    
  }

  loadResults(offset = 0) {
    const limit = 10;
    return app.store
      .find("biddingRankList", {
        page: {
          offset,
          limit
        },
      })
      .catch(() => {})
      .then(this.parseResults.bind(this));
  }
}
