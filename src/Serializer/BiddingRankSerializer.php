<?php
namespace wusong8899\biddingRank\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;

class BiddingRankSerializer extends AbstractSerializer
{
    protected $type = 'biddingRankList';

    protected function getDefaultAttributes($shop)
    {
        return [
            'id' => $shop->id,
            'title' => $shop->title,
            'content' => $shop->content,
            'user_id' => $shop->user_id,
            'url' => $shop->url,
            'bid' => $shop->bid,
        ];
    }

    protected function fromUser($biddingRank)
    {
        return $this->hasOne($biddingRank, BasicUserSerializer::class);
    }
}
