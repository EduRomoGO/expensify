<?php

namespace App\Http\Controllers;
use Request;
use App\Expense;
use Log;

class ExpensesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $expenses = Expense::all();
        return response()->json($expenses);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $input = Request::all();
        if (is_numeric($input['amount'])) {
            Expense::create($input);
            return response()->make($input, 200);
        } 
        else 
        {
            return response()->make('Amount must be numeric', 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $expense = Expense::find($id);
        $expense->delete();
    }
}
