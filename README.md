PissisExpressions v0.1
=====================

A ha-ha version of https://github.com/VerbalExpressions/JSVerbalExpressions by Jehna. Translated the function names to Finnish teen slang.


Docs
====

Use the official documentation, but replace the function names:

Original: startOfLine, Pissix: rivinEga  
Original: endOfLine, Pissix: rivinViga  
Original: then, Pissix: sit  
Original: find, Pissix: eti  
Original: maybe, Pissix: kait  
Original: anything, Pissix: ihaSama  
Original: anythingBut, Pissix: ihaSamaPaizi  
Original: something, Pissix: jotai  
Original: somethingBut, Pissix: jotaiPaizi  
Original: replace, Pissix: vaiha  
Original: lineBreak, Pissix: uusRivi  
Original: br, Pissix: breikki  
Original: tab, Pissix: täbi  
Original: word, Pissix: wördi  
Original: anyOf, Pissix: mikäVaa  
Original: range, Pissix: lössi  
Original: addModifier, Pissix: uusSäätö  
Original: removeModifier, Pissix: endaaSäätö  
Original: withAnyCase, Pissix: ihaSamaMikäKoko  
Original: stopAtFirst, Pissix: ekastStoppi  
Original: searchOneLine, Pissix: yhenRivinSöörtsi  
Original: multiple, Pissix: mont  
Original: or, Pissix: tai  
Original: beginCapture, Pissix: alotaKaappaa  
Original: endCapture, Pissix: lopetaKaappaa  

## Examples

Here's a couple of simple examples to give an idea of how PissixEx works:

### Testing if we have a valid URL

```javascript
// Create an example of how to test for correctly formed URLs
var tester = PissixEx()
            .laininEga()
            .sit( "http" )
            .kait( "s" )
            .sit( "://" )
            .kait( "www." )
            .mitäVaaPaizi( " " )
            .laininViga();

// Create an example URL
var testMe = "https://www.lidl.fi";

// Use RegExp object's native test() function
if( tester.test( testMe ) ) alert( "We have a correct URL "); // This output will fire
else alert( "The URL is incorrect" );

console.log( tester ); // Ouputs the actual expression used: /^(http)(s)?(\:\/\/)(www\.)?([^\ ]*)$/ 
```

### Replacing strings

```javascript
// Create a test string
var replaceMe = "Replace ES with Mad Croc";

// Create an expression that seeks for word "bird"
var expression = PissixEx().eti( "ES" );

// Execute the expression like a normal RegExp object
var result = replaceMe.replace( expression, "Mad Croc" );

alert( result ); // Outputs "Replace Mad Croc with Mad Croc"
```

### Shorthand for string replace:

```javascript
var result = PissixEx().eti( "mutsi" ).replace( "Meiän mutsi skitsoo iha vitusti", "faija" );
alert( result ); // Outputs "Meiän faija skitsoo iha vitusti"
```