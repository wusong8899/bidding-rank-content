<?php

namespace wusong8899\biddingRank\Controllers;

use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface;

class BiddingRankController
{
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        return $document;
    }
}
