@extends('app')

@section('content')

  <header class="home-header">Expensify - Controla tus gastos</header>

  <div id="new-expense-form-wrapper" class="form-wrapper">

    {!! Form::open(['url' => 'expenses']) !!}
      
      <div class="form-group">
        {!! Form::label('title', 'Título') !!}
        {!! Form::text('title', null, ['class' => 'form-control title' ]) !!}
      </div>

      <div class="form-group">
        {!! Form::label('amount', 'Cantidad') !!}
        {!! Form::text('amount', null, ['class' => 'form-control amount']) !!}
      </div>

    {!! Form::close() !!}

    <button class="form-group btn btn-primary create-expense" id="add" name="createExpense">
      Crear Gasto
    </button>

    <button class="form-group btn btn-primary see-expenses" id="see" name="showExpenses">
      Ver Gastos
    </button>


  </div>

@stop