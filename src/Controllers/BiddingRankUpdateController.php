<?php

namespace wusong8899\biddingRank\Controllers;

use wusong8899\biddingRank\Serializer\BiddingRankSerializer;
use wusong8899\biddingRank\Model\BiddingRank;

use Flarum\User\User;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Carbon;
use Illuminate\Support\Arr;

class BiddingRankUpdateController extends AbstractCreateController
{
    public $serializer = BiddingRankSerializer::class;
    protected $translator;

    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $bidID = Arr::get($request->getQueryParams(), 'id');

        if (!isset($bidID)) {
            $errorMessage = 'wusong8899-bidding-rank.forum.save-error';
        } else {
            $bidSaveData = Arr::get($request->getParsedBody(), 'data', null);
            $currentUserID = $request->getAttribute('actor')->id;
            $errorMessage = "";
            $bidData = BiddingRank::find($bidID);

            if (!isset($bidData)) {
                $errorMessage = 'wusong8899-guaguale.admin.guaguale-save-error';
            } else {
                if (Arr::has($bidSaveData, "attributes.isDelete")) {
                    $actor->assertAdmin();
                    $bidData->delete();
                    return true;
                } else {
                    if (Arr::has($bidSaveData, "attributes.title")) {
                        $bidData->title = Arr::get($bidSaveData, "attributes.title", "");
                    }
                    if (Arr::has($bidSaveData, "attributes.content")) {
                        $bidData->content = Arr::get($bidSaveData, "attributes.content", "");
                    }
                    if (Arr::has($bidSaveData, "attributes.url")) {
                        $bidData->url = Arr::get($bidSaveData, "attributes.url", "");
                    }
                    if (Arr::has($bidSaveData, "attributes.bidRaise")) {
                        $bidRaise = Arr::get($bidSaveData, "attributes.bidRaise", 0);
                        $currentUserData = User::find($currentUserID);
                        $currentUserMoneyRemain = $currentUserData->money - $bidRaise;

                        if ($currentUserMoneyRemain < 0) {
                            $errorMessage = 'wusong8899-bidding-rank.forum.insufficient-fund';
                        } else {
                            $bidData->bid += $bidRaise;
                            $currentUserData->money = $currentUserMoneyRemain;
                            $currentUserData->save();
                        }
                    }

                    if ($errorMessage === "") {
                        $bidData->save();
                        return $bidData;
                    }
                }
            }
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
