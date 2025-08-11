<?php

namespace wusong8899\biddingRank\Controllers;

use wusong8899\biddingRank\Serializer\BiddingRankSerializer;
use wusong8899\biddingRank\Model\BiddingRank;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Carbon;
use Flarum\User\User;

class BiddingRankAddController extends AbstractCreateController
{
    public $serializer = BiddingRankSerializer::class;
    protected $settings;
    protected $translator;

    public function __construct(Translator $translator, SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
        $this->translator = $translator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $currentUserID = $request->getAttribute('actor')->id;
        $requestData = $request->getParsedBody()['data']['attributes'];
        $bid = floatval($requestData['bid']);
        $content = $requestData['content'];
        $url = $requestData['url'];
        $title = $requestData['title'];
        $errorMessage = "";

        if (!isset($bid) || $bid < 10000) {
            $errorMessage = 'wusong8899-bidding-rank.forum.add-error';
        } else {
            $currentUserData = User::find($currentUserID);
            $currentUserMoneyRemain = $currentUserData->money - $bid;

            if ($currentUserMoneyRemain < 0) {
                $errorMessage = 'wusong8899-bidding-rank.forum.insufficient-fund';
            } else {
                $settingTimezone = 'Asia/Shanghai';

                $biddingRankData = new BiddingRank();
                $biddingRankData->content = $content;
                $biddingRankData->title = $title;
                $biddingRankData->user_id = $currentUserID;
                $biddingRankData->url = $url;
                $biddingRankData->bid = $bid;
                $biddingRankData->assigned_at = Carbon::now($settingTimezone);
                $biddingRankData->save();

                $currentUserData->money = $currentUserMoneyRemain;
                $currentUserData->save();

                return $biddingRankData;
            }
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
