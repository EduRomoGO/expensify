<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExpensesTest extends TestCase
{

  public function testExpensesRoute()
  {
    $this->visit('/expenses')
         ->seeStatusCode(200);
  }


	public function testCreateExpense()
	{
		$this->post('/expenses', ['title'=> 'ropa', 'amount' => 20])
				 ->seeInDatabase('expenses', ['title'=> 'ropa', 'amount' => 20], $connection = null);
	}

}