<?php

namespace wusong8899\biddingRank\Controllers;

use Flarum\User\User;
use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\Http\UrlGenerator;

use wusong8899\biddingRank\Serializer\BiddingRankSerializer;
use wusong8899\biddingRank\Model\BiddingRank;

class ListBiddingRankController extends AbstractListController
{
    public $serializer = BiddingRankSerializer::class;
    public $include = ['fromUser'];
    protected $url;

    public function __construct(UrlGenerator $url)
    {
        $this->url = $url;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $params = $request->getQueryParams();
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $actor = $request->getAttribute('actor');
        $currentUserID = $request->getAttribute('actor')->id;

        $moneyLeaderboardResult = BiddingRank::skip($offset)->take($limit + 1)->orderBy('bid', 'desc')->get();
        $hasMoreResults = $limit > 0 && $moneyLeaderboardResult->count() > $limit;

        if ($hasMoreResults) {
            $moneyLeaderboardResult->pop();
        }

        $document->addPaginationLinks(
            $this->url->to('api')->route('biddingRank.get'),
            $params,
            $offset,
            $limit,
            $hasMoreResults ? null : 0,
        );

        return $moneyLeaderboardResult;
    }
}
