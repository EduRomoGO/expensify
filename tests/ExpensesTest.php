<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Expense;
use Log;

class ExpensesTest extends TestCase
{

  public function testExpensesRoute()
  {
    $this->visit('/expenses')
         ->seeStatusCode(200);
  }


	public function testCreateExpense()
	{
		$dummyExpense = ['title'=> 'ropa', 'amount' => 20];
		$this->post('/expenses', $dummyExpense)
				 ->seeInDatabase('expenses', $dummyExpense, $connection = null);
	}

	public function testSeeExpenses()
	{
		$this->seedDatabase();

		$response = $this->call('GET', '/expenses');
		$expenses = $response->getData();

		$this->assertTrue( ($expenses[0]->title == 'ropa') || ($expenses[0]->title == 'juguetes') );
		$this->assertTrue( ($expenses[0]->amount == 20) || ($expenses[0]->amount == 30) );
		$this->assertCount(2, $expenses);
	}


	public function testDeleteExpense()
	{
		$this->seedDatabase();
		$expense = Expense::where('title', 'ropa')->first();

		$this->delete('/expenses/' . $expense->id)
				 ->notSeeInDatabase('expenses', ['title'=> 'ropa', 'amount' => 20], $connection = null);
	}


	private function seedDatabase()
	{
		Expense::truncate();
		$this->call('POST', '/expenses', ['title'=> 'ropa', 'amount' => 20]);
		$this->post('/expenses', ['title'=> 'juguetes', 'amount' => 30]);
	}


  public function testAppLandingRoute()
  {
    $this->visit('/')
         ->seeStatusCode(200);
  }


  public function testAmountMustBeNumeric()
  {
		$dummyExpense = ['title'=> 'ropa', 'amount' => 'aaa'];
		$this->post('/expenses', $dummyExpense)
				 ->notSeeInDatabase('expenses', $dummyExpense, $connection = null);
  }


  public function testReceiveMsgIfExpenseNotDeleted()
  {
		$response = $this->call('DELETE', '/expenses/30');
		$this->assertEquals($response->getContent(), 'Model not found');
  }

}