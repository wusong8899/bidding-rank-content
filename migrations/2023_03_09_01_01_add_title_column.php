<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasColumn('wusong8899_bidding_rank_content', 'title')) {
            $schema->table('wusong8899_bidding_rank_content', function (Blueprint $table) {
                $table->string('title', 200)->after('content');
            });
        }
    },
    'down' => function (Builder $schema) {

    }
];
