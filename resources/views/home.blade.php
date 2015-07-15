@extends('app')

@section('content')

  <div id="new-expense-form-wrapper">

    {!! Form::open(['url' => 'expenses']) !!}
      
      <div class="form-group">
        {!! Form::label('title', 'Título:') !!}
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
  
  </div>

@stop