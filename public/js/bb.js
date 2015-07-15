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



  var ExpensesView = Backbone.View.extend({
    
    el: $('body'),

    events: {
      'click button#add': 'addExpense',
      'click button#see': 'seeExpenses',
    },

    initialize: function(){
      _.bindAll(this, 'render', 'addExpense', 'appendExpense', 'seeExpenses');

      this.collection = new ExpenseList();
      this.collection.bind('add', this.render);
      FetchedExpenses.bind('update', this.render);

      this.render();
    },

    render: function(){
      var self = this;
      $('#expenses-home').remove();
      $(this.el).append("<section id='expenses-home'><ul></ul></section>");
      _(FetchedExpenses.models).each(function(expense){
        self.appendExpense(expense);
      }, this);
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
    },

    seeExpenses: function() {
      FetchedExpenses.fetch();
    }

  });

  var ExpensesListView = new ExpensesView();



})(jQuery);