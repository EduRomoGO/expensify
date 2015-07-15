<?php

$I = new AcceptanceTester($scenario);
$I->wantTo('check that main route has the new expense form');
$I->amOnPage('/');
$I->see('form div input.title');
$I->see('form div input.amount');