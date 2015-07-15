<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            <div class="content">
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
            </div>
        </div>
    </body>
</html>
