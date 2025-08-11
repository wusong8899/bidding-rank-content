<?php

namespace wusong8899\biddingRank\Model;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;

class BiddingRank extends AbstractModel
{
    use ScopeVisibilityTrait;
    protected $table = 'wusong8899_bidding_rank_content';

    public function fromUser()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
