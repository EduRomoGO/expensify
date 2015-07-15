<?php

use \Codeception\Util\Locator;

$I = new AcceptanceTester($scenario);
$I->wantTo('check that main route has the new expense form');
$I->amOnPage('/');
$I->seeElement(['css' => 'form div input'], ['name' => 'title']);
$I->seeElement(['css' => 'form div input'], ['name' => 'amount']);