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


  var MsgView = Backbone.View.extend({
    
    tagName: 'div',
    className: 'msg expense-ok',

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(msg) {
      $(this.el).html(msg);
      return this;
    }

  });


  var ExpenseView = Backbone.View.extend({
    
    tagName: 'li',
    
    events: {
      'click span.delete': 'remove'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'remove', 'removeElementFromList');

      this.model.bind('remove', this.removeElementFromList);
    },

    render: function() {
      $(this.el).html(
        "<span>" + this.model.attributes.title + "&nbsp;&nbsp;&nbsp;" + this.model.attributes.amount + "</span>" +
        "&nbsp;&nbsp; <span class='glyphicon glyphicon-remove delete' aria-hidden='true'></span>");
      return this;
    },

    removeElementFromList: function() {
      $(this.el).remove();
    },

    remove: function() {
      this.model.destroy();
    }

  });



  var ExpensesView = Backbone.View.extend({
    
    el: $('body'),

    events: {
      'click button#add': 'addExpense',
      'click button#see': 'seeExpenses',
    },

    initialize: function(){
      _.bindAll(this, 'render', 'addExpense', 'appendExpense', 'seeExpenses', 'showMsg');

      this.collection = new ExpenseList();
      FetchedExpenses.bind('update', this.render);

      this.render();
    },

    render: function(){
      var self = this;
      $('#expenses-home').remove();
      $(this.el).append("<section id='expenses-home' class='expenses-home'><ul></ul></section>");
      $('.expenses-home').prepend("<h1 class='expenses-title'>Lista de Gastos:</h1>");
      _(FetchedExpenses.models).each(function(expense){
        self.appendExpense(expense);
      }, this);
    },

    addExpense: function () {
      var expense = new Expense();
      expense.set({title: $('.title').val(), amount: $('.amount').val()});
      this.collection.add(expense);
      expense.save(null, {
          'error': this.showMsg,
          'success': this.showMsg
      });
    },

    appendExpense: function (expense) {
      $('.expenses-title').removeClass("expenses-title");
      var expenseView = new ExpenseView({
        model: expense
      });
      $('ul', this.el).append(expenseView.render().el);
    },

    seeExpenses: function() {
      FetchedExpenses.fetch();
    },

    showMsg: function(model, res) {
      $('.title').val('');
      $('.amount').val('');
      $('.msg').remove();
      var msgView = new MsgView();
      if (typeof res.responseText === "undefined") { 
        var msg = 'Gasto creado correctamente';
      }
      else { 
        var msg = res.responseText;
      }
      $('.container', this.el).append(msgView.render(msg).el);
      $('.msg').delay(500).fadeOut(2000);
    }

  });

  var ExpensesListView = new ExpensesView();



})(jQuery);