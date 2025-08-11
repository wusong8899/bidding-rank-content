import { extend } from 'flarum/extend';
import app from 'flarum/forum/app';
import IndexPage from 'flarum/components/IndexPage';
import LinkButton from 'flarum/components/LinkButton';

export default function addSidebarMenu() {
  extend(IndexPage.prototype, 'navItems', function (items) {

    items.add(
      'BiddingRank',
      <LinkButton icon="fas fa-funnel-dollar" href={app.route('biddingRank')}>
        {app.translator.trans('wusong8899-bidding-rank.forum.bidding-rank-content')}
      </LinkButton>,
      15
    );

    return items;
  });
}
