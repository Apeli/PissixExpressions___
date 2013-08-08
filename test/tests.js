test( "something", function() {
    var testRegex = PissixEx().jotai();
    var testString;

    testString = "";
    ok( ! testRegex.test( testString ), "empty string doesn't have something" );

    testRegex.lastIndex = 0;
    testString = "a";
    ok( testRegex.test( testString ), "a is something" );
} );

test( "anything", function() {
    var testRegex = PissixEx().laininStartti().ihaSama();
    var testString = "what";
    ok( testRegex.test( testString ), "Passes!" );
} );

test( "anythingBut", function() {
    var testRegex = PissixEx().laininStartti().ihaSamaPaizi( "w" );
    var testString = "what";
    ok( testRegex.test( testString ), "starts with w" );
} );

test( "somethingBut", function() {
    var testRegex = PissixEx().jotaiPaizi("a");
    var testString;

    testString = "";
    ok( ! testRegex.test( testString ), "empty string doesn't have something" );

    testRegex.lastIndex = 0;
    testString = "b";
    ok( testRegex.test( testString ), "doesn't start with a" );

    testRegex.lastIndex = 0;
    testString = "a";
    ok( ! testRegex.test( testString ), "starts with a" );
} );

test( "laininStartti", function() {
    var testRegex = PissixEx().laininStartti().sit( "a" );
    var testString;

    testString = "a";
    ok( testRegex.test( testString ), "Starts with a" );

    testRegex.lastIndex = 0;
    testString = "ba";
    ok( ! testRegex.test( testString ), "Doesn't start with a" );
} );

test( "laininEndi", function() {
    var testRegex = PissixEx().eti( "a" ).laininEndi();
    var testString;

    testString = "a";
    ok( testRegex.test( testString ), "Ends with a" );

    testRegex.lastIndex = 0;
    testString = "ab";
    ok( ! testRegex.test( testString ), "Doesn't end with a" );
} );

test( "kait", function() {
    var testRegex = PissixEx().laininStartti().sit( "a" ).kait( "b" );
    var testString;

    testString = "acb";
    ok( testRegex.test( testString ), "Maybe has a b after an a" );

    testRegex.lastIndex = 0;
    testString = "abc";
    ok( testRegex.test( testString ), "Maybe has a b after an a" );
} );

test( "mikäVaa", function() {
    var testRegex = PissixEx().laininStartti().sit( "a" ).mikäVaa( "xyz" );
    var testString;

    testString = "ay";
    ok( testRegex.test( testString ), "Has an x, y, or z after a" );

    testRegex.lastIndex = 0;
    testString = "abc";
    ok( ! testRegex.test( testString ), "Doesn't have an x, y, or z after a" );
} );

test( "tai", function() {
    var testRegex = PissixEx().laininStartti().sit( "abc" ).tai( "def" );
    var testString;

    testString = "defzzz";
    ok( testRegex.test( testString ), "Starts with abc or def" );

    testRegex.lastIndex = 0;
    testString = "xyzabc";
    ok( ! testRegex.test( testString ), "Doesn't start with abc or def" );
} );

test( "uusRivi", function() {
    var testRegex;
    var testString;

    testRegex = PissixEx().laininStartti().sit( "abc" ).uusRivi().sit( "def" );
    testString = "abc\r\ndef";
    ok( testRegex.test( testString ), "abc then line break then def" );

    testRegex.lastIndex = 0;
    testString = "abc\ndef";
    ok( testRegex.test( testString ), "abc then line break then def" );

    testRegex.lastIndex = 0;
    testString = "abc\r\n def";
    ok( ! testRegex.test( testString ), "abc then line break then space then def" );
} );

test( "br", function() {
    var testRegex;
    var testString;

    testRegex = PissixEx().laininStartti().sit( "abc" ).uusRivi().sit( "def" );
    testString = "abc\r\ndef";
    ok( testRegex.test( testString ), "abc then line break then def" );

    testRegex.lastIndex = 0;
    testString = "abc\ndef";
    ok( testRegex.test( testString ), "abc then line break then def" );

    testRegex.lastIndex = 0;
    testString = "abc\r\n def";
    ok( ! testRegex.test( testString ), "abc then line break then space then def" );
} );

test( "täbi", function() {
    var testRegex;
    var testString;

    testRegex = PissixEx().laininStartti().täbi().sit( "abc" );
    testString = "\tabc";
    ok( testRegex.test( testString ), "tab then abc" );

    testRegex.lastIndex = 0;
    testString = "abc";
    ok( ! testRegex.test( testString ), "no tab then abc" );
} );

test( "ihaSamaMikäKoko", function() {
    var testRegex;
    var testString;

    testRegex = PissixEx().laininStartti().sit( "a" );
    testString = "A";
    ok( ! testRegex.test( testString ), "not case insensitive" );

    testRegex = PissixEx().laininStartti().sit( "a" ).ihaSamaMikäKoko();
    testString = "A";
    ok( testRegex.test( testString ), "case insensitive" );

    testRegex.lastIndex = 0;
    testString = "a";
    ok( testRegex.test( testString ), "case insensitive" );
} );

test( "yhenRivinSöörtsi", function() {
    var testRegex;
    var testString;

    testRegex = PissixEx().laininStartti().sit( "a" ).breikki().sit( "b" ).laininEndi();
    testString = "a\nb";
    ok( testRegex.test( testString ), "b is on the second line" );

    testRegex = PissixEx().laininStartti().sit( "a" ).breikki().sit( "b" ).laininEndi().yhenRivinSöörtsi();
    testString = "a\nb";
    ok( testRegex.test( testString ), "b is on the second line but we are only searching the first" );
} );

