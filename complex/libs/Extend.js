function Extend(OriginalClass) {

    var SubClass = function(){
    }
    SubClass.prototype = new OriginalClass();

    return SubClass;
}