<?php

namespace wusong8899\biddingRank\Controllers;

use wusong8899\biddingRank\Serializer\BiddingRankSerializer;
use wusong8899\biddingRank\Model\BiddingRank;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class BiddingRankHistoryController extends AbstractListController
{
    public $serializer = BiddingRankSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $currentUserID = $actor->id;
        $biddingRankUserResult = BiddingRank::where(["user_id" => $currentUserID])->get();

        return $biddingRankUserResult;
    }
}
