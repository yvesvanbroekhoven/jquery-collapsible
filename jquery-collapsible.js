/*
 * Collapse the slibling
 * Author: Yves Van Broekhoven
 * Created at: 2011-03-10
 * Version: 1.0.0
 */
 
(function($){
  
  var _init
  ,   _open
  ,   _close
  ,   _toggle
  ,   _saveState
  ,   _openState
  ,   _createCookie
  ,   _readCookie
  ,   _eraseCookie
  ;
  
  _init = function($ctx){
    var opts = $ctx.data('opts');
    var triggers = $(opts.trigger, $ctx);
    
    // Read state cookie
    _openState($ctx);
    
    // Init states
    triggers.each(function(){
      if ($(this).hasClass('open')) {
        return;
      }
      _close($(this), opts);
    });
    
    // Events
    triggers.click(function(){
      _toggle($(this), opts);
    });
    
    $(window).unload(function(){
      _saveState($ctx);
    });
  };
  
  _close = function(trigger, opts){
    $(trigger).siblings(opts.target).hide();
    trigger.addClass(opts.closed)
           .removeClass(opts.open);
  };
  
  _open = function(trigger, opts){
    $(trigger).siblings(opts.target).show();
    trigger.addClass(opts.open)
           .removeClass(opts.closed);
  };
  
  _toggle = function(trigger, opts){
    if (trigger.hasClass(opts.open)){
      _close(trigger, opts);
    } else {
      _open(trigger, opts);
    }
  };
  
  _saveState = function($ctx){
    var cookie = [];
    var opts = $ctx.data('opts');

    $(opts.trigger, $ctx).each(function(){
      var parent_id = $(this).parent().attr('id');
      var obj = {}
      if (parent_id && $(this).hasClass('open')) {
        cookie.push(parent_id);
      }
    });
    
    _createCookie('collapsible-state', JSON.stringify(cookie), 30);
    
  };
  
  _openState = function($ctx){
    if (_readCookie('collapsible-state')) {
      var opts = $ctx.data('opts');
      open_states = $.parseJSON(_readCookie('collapsible-state'));
      $.each(open_states, function(idx, value){
        $(opts.trigger, "#" + value).first().addClass('open');
      });
    }
  };
  
  _createCookie = function(name,value,days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = "; expires="+date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=" + location.pathname;
  };

  _readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  };

  _eraseCookie = function(name) {
    createCookie(name,"",-1);
  };

  /*
   * Public
   */
  $.fn.collapsible = function(options){  
    // Extend options
    var opts = options ? $.extend({}, $.fn.collapsible.defaults, options) : $.fn.collapsible.defaults;
    
    return this.each(function(){
      $ctx = $(this);
      $ctx.data('opts', opts);
      _init($ctx);
    });
    
  };
  
  $.fn.collapsible.defaults = {
    'trigger' : '.collapsible-trigger',
    'target'  : '.collapsible-target',
    'open'    : 'open',
    'closed'  : 'closed',
  };
  
  $.fn.collapsible.saveState = function($ctx){
    _saveState($ctx);
  };
  
  
})(jQuery);

