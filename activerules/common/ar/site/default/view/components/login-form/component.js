module.exports = class {
    onCreate() {
        this.state = {
            count:0
        };
    }
    increment() {
        this.state.count++;
    }
    onButtonClick(text) {
      alert(text);
      console.log(text);
    }
}