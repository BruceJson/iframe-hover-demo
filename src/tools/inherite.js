function People(name, age) {
    this.name = name;
    this.age = age;
}

People.prototype.getName = function () {
    return this.name;
};

People.prototype.getAge = function () {
    return this.age;
};

function English(name, age, language) {
    People.call(this, name, age);
    this.language = language;
}

inherits(English, People);

function inherits(child, parent) {
    var _prototype = Object.create(parent.prototype);

    _prototype.constructor = child.prototype.constructor;

    child.prototype = _prototype;
};
