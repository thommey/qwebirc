qwebirc.irc.IRCLowerTable = [
/* x00-x07 */ '\x00', '\x01', '\x02', '\x03', '\x04', '\x05', '\x06', '\x07',
/* x08-x0f */ '\x08', '\x09', '\x0a', '\x0b', '\x0c', '\x0d', '\x0e', '\x0f',
/* x10-x17 */ '\x10', '\x11', '\x12', '\x13', '\x14', '\x15', '\x16', '\x17',
/* x18-x1f */ '\x18', '\x19', '\x1a', '\x1b', '\x1c', '\x1d', '\x1e', '\x1f',
/* ' '-x27 */    ' ',    '!',    '"',    '#',    '$',    '%',    '&', '\x27',
/* '('-'/' */    '(',    ')',    '*',    '+',    ',',    '-',    '.',    '/',
/* '0'-'7' */    '0',    '1',    '2',    '3',    '4',    '5',    '6',    '7',
/* '8'-'?' */    '8',    '9',    ':',    ';',    '<',    '=',    '>',    '?',
/* '@'-'G' */    '@',    'a',    'b',    'c',    'd',    'e',    'f',    'g',
/* 'H'-'O' */    'h',    'i',    'j',    'k',    'l',    'm',    'n',    'o',
/* 'P'-'W' */    'p',    'q',    'r',    's',    't',    'u',    'v',    'w',
/* 'X'-'_' */    'x',    'y',    'z',    '{',    '|',    '}',    '~',    '_',
/* '`'-'g' */    '`',    'a',    'b',    'c',    'd',    'e',    'f',    'g',
/* 'h'-'o' */    'h',    'i',    'j',    'k',    'l',    'm',    'n',    'o',
/* 'p'-'w' */    'p',    'q',    'r',    's',    't',    'u',    'v',    'w',
/* 'x'-x7f */    'x',    'y',    'z',    '{',    '|',    '}',    '~', '\x7f',
];

qwebirc.irc.RFC1459ToIRCLowerChar = function(ch) {
  var cc = ch.charCodeAt(0);
  return qwebirc.irc.IRCLowerTable[cc];
}

qwebirc.irc.UnicodeToIRCLowerChar = function(ch) {
  return ch.toLowerCase();
}

qwebirc.irc.IdentityChar = function(ch) {
  return ch;
}

qwebirc.irc.getToIRCLowerChar = function(ASCIILowerCharFunc, UnicodeLowerCharFunc) {
  if (UnicodeLowerCharFunc === ASCIILowerCharFunc) {
    return ASCIILowerCharFunc;
  }
  return function(ch) {
    return (ch.charCodeAt(0) <= 0x7F ? ASCIILowerCharFunc : UnicodeLowerCharFunc)(ch);
  };
}

qwebirc.irc.getToIRCLower = function(ASCIILowerCharFunc, UnicodeLowerCharFunc) {
  var toIRCLowerChar = qwebirc.irc.getToIRCLowerChar(ASCIILowerCharFunc, UnicodeLowerCharFunc);
  return function(x) {
    var p = [];
    for (var i=0;i<x.length;i++) {
      p.push(toIRCLowerChar(x.charAt(i)));
    }
    return p.join("");
  };
}

String.prototype.hostToNick = function() {
  return this.split("!", 1)[0];
}

String.prototype.hostToHost = function() {
  return this.split("!", 2)[1];
}

qwebirc.irc.IRCTimestamp = function(d) {
  return "[" + qwebirc.util.pad(d.getHours()) + ":" + qwebirc.util.pad(d.getMinutes()) + "]";
}

qwebirc.irc.IRCDate = function(d) {
  var pad = qwebirc.util.pad;
  
  return qwebirc.util.DaysOfWeek[d.getDay()] + " " + qwebirc.util.MonthsOfYear[d.getMonth()] + " " + pad(d.getDate()) + " "  + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + " " + d.getFullYear();
}

qwebirc.irc.toIRCCompletion = function(client, data) {
  return client.toIRCLower(data);
}
