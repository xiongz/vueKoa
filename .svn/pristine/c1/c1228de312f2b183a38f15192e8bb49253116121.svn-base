/**
 * Created by Administrator on 2016/6/30.
 */
Document.prototype._addEventListener = Document.prototype.addEventListener;
Document.prototype._removeEventListener = Document.prototype.removeEventListener;

Document.prototype.addEventListener = function (type, callback, flag, only) {
  if(!only) {
    Document.prototype._addEventListener.call(this, type, callback, flag)
    return
  }
  if(typeof this.eventStacks == 'undefined'){
    this.eventStacks = []
  }
  if(!this.eventStacks.includes(only)){
    this.eventStacks.push(only)
    Document.prototype._addEventListener.call(this, type, callback, flag)
  }
}

Document.prototype.removeEventListener = function (type, callback, only) {
  if(!only) {
    Document.prototype._removeEventListener.call(this, type, callback)
    return
  }
  if(typeof this.eventStacks == 'undefined'){
    Document.prototype._removeEventListener.call(this, type, callback)
    return
  }
  if(!this.eventStacks.includes(only)){
    var index = this.eventStacks.indexOf(only)
    this.eventStacks.splice(index,1)
    Document.prototype._removeEventListener.call(this, type, callback)
  }
}
