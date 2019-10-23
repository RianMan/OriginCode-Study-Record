function SuperClass(id){
    this.books = ['js','python','php'];
    this.id = id;
}

SuperClass.prototype.showBooks = function(){
    console.log(this.books)
};

function SubClass(id){
    SuperClass.call(this,id);
    this.name = 'Subclass';
}
const sub1 = new SubClass(1);
const sub2 = new SubClass(2);

sub1.books[1] = 'java'
console.log(sub1.id,sub1.name,sub1.books);
console.log(sub2.id,sub2.name,sub2.books);

