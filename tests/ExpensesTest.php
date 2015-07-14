<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Expense;

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

	public function testSeeExpenses()
	{
		$this->seedDatabase();

		$response = $this->call('GET', '/expenses');
		$expenses = $response->getData();

		$this->assertCount(2, $expenses);
	}


	private function seedDatabase ()
	{
		Expense::truncate();
		$this->call('POST', '/expenses', ['title'=> 'ropa', 'amount' => 20]);
		$this->post('/expenses', ['title'=> 'juguetes', 'amount' => 30]);
	}

}