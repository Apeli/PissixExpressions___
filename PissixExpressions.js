/*!
 * PissixExpressions JavaScript Library v0.1
 * https://github.com/Apeli/PissixExpressions
 *
 *
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-19
 * 
 */

// Define the collection class.
(function(){

		var root = this;

    // I am the constructor function.
    function PissixExpression(){
        var pissixExpression = Object.create( RegExp.prototype );
        
        // Initialize 
        pissixExpression = (RegExp.apply( pissixExpression, arguments ) || pissixExpression);
     
        // Add all the class methods
        PissixExpression.injectClassMethods( pissixExpression );

        // Return the new object.
        return( pissixExpression );
    }
 
 
    // Define the static methods.
    PissixExpression.injectClassMethods = function( pissixExpression ){
 
        // Loop over all the prototype methods
        for (var method in PissixExpression.prototype){
 
            // Make sure this is a local method.
            if (PissixExpression.prototype.hasOwnProperty( method )){
 
                // Add the method
                pissixExpression[ method ] = PissixExpression.prototype[ method ];
 
            }
 
        }
        
        return( pissixExpression );
 
    };
 
    // Define the class methods.
    PissixExpression.prototype = {
        
        // Variables to hold the whole
        // expression construction in order
        _prefixes : "",
        _source : "",
        _suffixes : "",
        _modifiers : "gm", // default to global multiline matching
        
        
        // Sanitation function for adding
        // anything safely to the expression
        sanitize : function( value ) {
            if(value.source) return value.source;
            return value.replace(/[^\w]/g, function(character) { return "\\" + character; });
        },
        
        // Function to add stuff to the
        // expression. Also compiles the
        // new expression so it's ready to
        // be used.
        add: function( value ) {
            this._source += value || "";
            this.compile(this._prefixes + this._source + this._suffixes, this._modifiers);
            return( this );
        },
        
        // Start and end of line functions
        // Original: startOfLine
        rivinEga: function( enable ) {
            enable = ( enable !== false );
            this._prefixes = enable ? "^" : "";
            this.add( "" );
            return( this );
        },
        
        // Original: endOfLine
        rivinViga : function( enable ) {
            enable = ( enable !== false );
            this._suffixes = enable ? "$" : "";
            this.add( "" );
            return( this );
        },
        
        // We try to keep the syntax as
        // user-friendly as possible.
        // So we can use the "normal"
        // behaviour to split the "sentences"
        // naturally.
        // Original: then
        sit : function( value ) {
            value = this.sanitize( value );
            this.add( "(?:" + value + ")" );
            return( this );
        },
        
        // And because we can't start with
        // "then" function, we create an alias
        // to be used as the first function
        // of the chain.
        // Original: find
        eti : function( value ) {
            return( this.sit( value ) );
        },
        
        // Maybe is used to add values with ?
        // Original: maybe
        kait : function( value ) {
            value = this.sanitize(value);
            this.add( "(?:" + value + ")?" );
            return( this );
        },
        
        // Any character any number of times
        // Original: anything
        ihaSama : function() {
            this.add( "(?:.*)" );
            return( this );
        },
        
        // Anything but these characters
        // Original: anythingBut
        ihaSamaPaizi : function( value ) {
            value = this.sanitize( value );
            this.add( "(?:[^" + value + "]*)" );
            return( this );
        },

        // Any character at least one time
        // Original: something
        jotai : function() {
            this.add( "(?:.+)" );
            return( this );
        },

        // Any character at least one time except for these characters
        // Original: somethingBut
        jotaiPaizi : function( value ) {
            value = this.sanitize( value );
            this.add( "(?:[^" + value + "]+)" );
            return( this );
        },

        // Shorthand function for the
        // String.replace function to
        // give more logical flow if, for
        // example, we're doing multiple
        // replacements on one regexp.
        // Original: replace
        vaiha : function( source, value ) {
            source = source.toString();
            return source.replace( this, value );
        },
        
        
        /// Add regular expression special ///
        /// characters                     ///
        
        // Line break
        // Original: lineBreak
        uusRivi : function() {
            this.add( "(?:(?:\\n)|(?:\\r\\n))" ); // Unix + windows CLRF
            return( this );
        },
        // And a shorthand for html-minded
        //Original: br
        breikki : function() {
            return this.uusRivi();
        },
        
        // Tab (duh?)
        //Original: tab
        täbi : function() {
            this.add( "\\t" );
            return( this );
        },
        
        // Any alphanumeric
        // Original: word
        wördi : function() {
            this.add( "\\w+" );
            return( this );
        },
        
        // Any given character
        // Original: anyOf
        mikäVaa : function( value ) {
            value = this.sanitize(value);
            this.add( "["+ value +"]" );
            return( this );
        },
        
        // Shorthand
        // any : function( value ) {
        //     return( this.anyOf( value ) );
        // },
        
        // Usage: .range( from, to [, from, to ... ] )
        // Original: range
        lössi : function() {
            
            var value = "[";
            
            for(var _from = 0; _from < arguments.length; _from += 2) {
                var _to = _from+1;
                if(arguments.length <= to) break;
                
                var from = this.sanitize( arguments[_from] );
                var to = this.sanitize( arguments[_to] );
                
                value += from + "-" + to;
            }
            
            value += "]";
            
            this.add( value );
            return( this );
        },
        
        
        /// Modifiers      ///
        
        // Modifier abstraction
        //Original: addModifier
        uusSäätö : function( modifier ) {
            if( this._modifiers.indexOf( modifier ) == -1 ) {
                this._modifiers += modifier;
            }
            this.add("");
            return( this );
        },
        //Original: removeModifier
        endaaSäätö : function( modifier ) {
            this._modifiers = this._modifiers.replace( modifier, "" );
            this.add("");
            return( this );
        },
        
        // Case-insensitivity modifier
        //Original: withAnyCase
        ihaSamaMikäKoko : function( enable ) {
            
            if(enable !== false) this.uusSäätö( "i" );
            else this.endaaSäätö( "i" );
            
            this.add( "" );
            return( this );
            
        },
        
        // Default behaviour is with "g" modifier,
        // so we can turn this another way around
        // than other modifiers
        // Original: stopAtFirst
        ekastStoppi : function( enable ) {
            
            if(enable !== false) this.endaaSäätö( "g" );
            else this.uusSäätö( "g" );
            
            this.add( "" );
            return( this );
            
        },
        
        // Multiline, also reversed
        // Original: searchOneLine
        yhenRivinSöörtsi : function( enable ) {
            
            if(enable !== false) this.endaaSäätö( "m" );
            else this.uusSäätö( "m" );
            
            this.add( "" );
            return( this );
            
        },
        
        
        
        /// Loops  ///
        
        //Original: multiple
        mont : function( value ) {
            // Use expression or string
            value = value.source ? value.source : this.sanitize(value);
            switch(value.substr(-1)) {
                case "*":
                case "+":
                    break;
                default:
                    value += "+";
            }
            this.add( value );
            return( this );
        },
        
        // Adds alternative expressions
        // Original: or
        tai : function( value ) {
            
            this._prefixes += "(?:";
            this._suffixes = ")" + this._suffixes;
            
            this.add( ")|(?:" );
            if(value) this.sit( value );
            
            return( this );
        },

        //starts a capturing group
        // Original: beginCapture
        alotaKaappaa : function() {
            //add the end of the capture group to the suffixes for now so compilation continues to work
            this._suffixes += ")";
            this.add( "(", false );

            return( this );
        },

        //ends a capturing group
        // Original: endCapture
        lopetaKaappaa : function() {
						//remove the last parentheses from the _suffixes and add to the regex itself
            this._suffixes = this._suffixes.substring(0, this._suffixes.length - 1 );
            this.add( ")", true );
            
            return( this );
        }
        
    };

    function createPissixExpression() {
        return new PissixExpression();
    }

    // support both browser and node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = createPissixExpression;
    }
    else if (typeof define === 'function' && define.amd) {
        define(PissixExpression);
    }
    else {
        root.PissixEx = createPissixExpression;
    }
 
}).call();
