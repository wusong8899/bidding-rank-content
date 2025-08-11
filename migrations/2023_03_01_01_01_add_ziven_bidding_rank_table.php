<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasTable('wusong8899_bidding_rank_content')) {
            $schema->create('wusong8899_bidding_rank_content', function (Blueprint $table) {
                $table->increments('id');
                $table->string('content', 500);
                $table->integer('user_id')->unsigned()->default(0);
                $table->string('url', 500);
                $table->integer('bid')->unsigned()->default(0);
                $table->dateTime('assigned_at');

                $table->index('bid');
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->drop('wusong8899_bidding_rank_content');
    },
];
