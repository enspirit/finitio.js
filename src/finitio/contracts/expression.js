module.exports = (function(){
  return {

    defn: {

      dress: function(args){
        if (!/^return/.test(args[args.length-1])){
          args[args.length-1] = 'return ' + args[args.length-1];
        }
        var fn = Function.apply(Function, args);
        fn.defn = args;
        return fn;
      },

      undress: function(fn){
        if (!fn.defn){
          throw new Error('No defn found: ' + fn.toString());
        }
        return fn.defn;
      }

    }

  };
})();

