/*
 * Collapse the slibling
 * Author: Yves Van Broekhoven
 * Created at: 2011-03-10
 */
 
(function($){
  
  var _init
  ,   _open
  ,   _close
  ,   _toggle
  ;
  
  _init = function($ctx, opts){
    var triggers = $(opts.trigger, $ctx);
    triggers.each(function(){
      if ($(this).hasClass('open')) {
        return;
      }
      _close($(this), opts);
    });
    
    triggers.click(function(){
      _toggle($(this), opts);
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
  
  $.fn.collapsible = function(options){  
    // Extend options
    var opts = options ? $.extend({}, $.fn.collapsible.defaults, options) : $.fn.collapsible.defaults;
    
    return this.each(function(){
      $ctx = $(this);
      _init($ctx, opts);
    });
    
  };
  
  $.fn.collapsible.defaults = {
    'trigger' : '.collapsible-trigger',
    'target'  : '.collapsible-target',
    'open'    : 'open',
    'closed'  : 'closed'
  };
  
})(jQuery);

