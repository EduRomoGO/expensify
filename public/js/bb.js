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
    
    events: {
      'click .close': 'hideMsg'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'hideMsg');
    },

    render: function() {
      $(this.el).html('<span class="close expense-ok">Gasto creado correctamente</span>');
      console.log('hola hola');
      return this;
    },

    hideMsg: function() {
      $('.close').hide();
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
        this.model.attributes.title + " " + this.model.attributes.amount + 
        "  <span class='delete' style='color:red';>eliminar</span>");
      return this;
    },

    removeElementFromList: function() {
      $(this.el).remove();
    },

    remove: function() {
      //console.log("hola");
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
      _.bindAll(this, 'render', 'addExpense', 'appendExpense', 'seeExpenses', 'showMsgNewExpenseAdded');

      this.collection = new ExpenseList();
      this.collection.bind('add', this.showMsgNewExpenseAdded);
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
    },

    addExpense: function () {
      var expense = new Expense();
      expense.set({title: $('.title').val(), amount: $('.amount').val()});
      this.collection.add(expense);
      expense.save({success: this.showMsgNewExpenseAdded});
    },

    appendExpense: function (expense) {
      var expenseView = new ExpenseView({
        model: expense
      });
      $('ul', this.el).append(expenseView.render().el);
    },

    seeExpenses: function() {
      FetchedExpenses.fetch();
    },

    showMsgNewExpenseAdded: function() {
      console.log('hola');
      var msgView = new MsgView();
      $('section', this.el).append(msgView.render().el);
    }

  });

  var ExpensesListView = new ExpensesView();



})(jQuery);