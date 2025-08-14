import SettingsPage from './components/SettingsPage';
import BiddingRank from "../forum/model/BiddingRank";

app.initializers.add('wusong8899-client1-bidding-rank-content', () => {
  app.store.models.biddingRankList = BiddingRank;
  app.extensionData.for('wusong8899-bidding-rank-content').registerPage(SettingsPage);
});
