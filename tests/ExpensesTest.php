<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExpensesTest extends TestCase
{
  public function testAddRoute()
  {
      $this->visit('/expenses')
           ->seeStatusCode(200);
  }
}