<?php

use Flarum\Extend;
use wusong8899\biddingRank\Controllers\BiddingRankController;
use wusong8899\biddingRank\Controllers\ListBiddingRankController;
use wusong8899\biddingRank\Controllers\BiddingRankAddController;
use wusong8899\biddingRank\Controllers\BiddingRankHistoryController;
use wusong8899\biddingRank\Controllers\BiddingRankUpdateController;

$extend = [
    (new Extend\Frontend('admin'))->js(__DIR__ . '/js/dist/admin.js')->css(__DIR__ . '/less/admin.less'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__ . '/less/forum.less')
        ->route('/biddingRank', 'biddingRank.index', BiddingRankController::class),

    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\Routes('api'))
        ->get('/biddingRankList', 'biddingRank.get', ListBiddingRankController::class)
        ->post('/biddingRankList', 'biddingRank.add', BiddingRankAddController::class)
        ->patch('/biddingRankList/{id}', 'biddingRank.update', BiddingRankUpdateController::class)
        ->get('/biddingRankHistory', 'biddingRank.history', BiddingRankHistoryController::class),
];

return $extend;