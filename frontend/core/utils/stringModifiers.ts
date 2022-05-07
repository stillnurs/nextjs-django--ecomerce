
String.prototype.toTitle = function ():string{
    return this
    .toLowerCase()
    .replace(/\w/, (firstLetter: string) => firstLetter.toUpperCase());
}
