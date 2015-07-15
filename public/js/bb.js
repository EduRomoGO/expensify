(function($){

  var Expense = Backbone.Model.extend({
    urlRoot: '/expenses',
    defaults: {
      title: 'hdd',
      amount: '80'
    }
  });

  var ExpenseList = Backbone.Collection.extend({
    model: Expense,
    url: '/expenses'
  });

  var FetchedExpenses = new ExpenseList();



  var ExpenseView = Backbone.View.extend({
    
    tagName: 'li',
    
    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function() {
      $(this.el).html(
        this.model.attributes.title + " " + this.model.attributes.amount);
      return this;
    }

  });




  var FetchedExpensesView = Backbone.View.extend({
    
    el: 'body',
    
    events: {
      'click button#see': 'seeExpenses',
    },

    initialize: function(){
      _.bindAll(this, 'render', 'seeExpenses', 'appendExpense');
      FetchedExpenses.bind('update', this.render);
    },

    render: function() {
      var self = this;
      $('#expenses-fetched-home').remove();
      $(this.el).append("<section id='expenses-fetched-home'><ul class='fetched'></ul></section>");
      _(FetchedExpenses.models).each(function(expense){
        self.appendExpense(expense);
      }, this);
    },

    seeExpenses: function() {
      FetchedExpenses.fetch();
    },

    appendExpense: function (expense) {
      var expenseView = new ExpenseView({
        model: expense
      });
      $('ul', this.el).append(expenseView.render().el);
    }

  });

  var FetchedExpensesListView = new FetchedExpensesView();




  var ExpensesView = Backbone.View.extend({
    
    el: $('body'),

    events: {
      'click button#add': 'addExpense'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'addExpense', 'appendExpense');

      this.collection = new ExpenseList();
      this.collection.bind('add', this.appendExpense);

      this.render();
    },

    render: function(){
      var self = this;
      $(this.el).append("<section id='expenses-created-home'><ul></ul></section>");
      _(this.collection.models).each(function(expense){
        self.appendExpense(expense);
      }, this);
    },

    addExpense: function () {
      var expense = new Expense();
      expense.set({title: $('.title').val(), amount: $('.amount').val()});
      this.collection.add(expense);
      expense.save();
    },

    appendExpense: function (expense) {
      var expenseView = new ExpenseView({
        model: expense
      });
      $('ul', this.el).append(expenseView.render().el);
    }

  });

  var ExpensesListView = new ExpensesView();



})(jQuery);