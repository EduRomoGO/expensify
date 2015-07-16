<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Expensify</title>
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
	<div class="container">
		@yield('content')
	</div>
	<script type="text/javascript" src="{{ asset('js/vendor/jquery-1.11.3.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/vendor/underscore.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/vendor/backbone.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/bb.js') }}"></script>
</body>
</html>