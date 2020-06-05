'use strict';

const RedisSMQ = require('rsmq');

function promisify(func) {
    return function promiseFunc(options) {
        return new Promise(function executor(resolve, reject) {
          if(typeof options === 'undefined'){
            func(function cb(err, val) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(val);
                }
            });
          }else{
            func(options, function cb(err, val) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(val);
                }
            });
          }
        });
    }
}

class RedisSMQPromise {

    constructor(options) {
        this.rsmq = new RedisSMQ(options);
    };

    get listQueues() {
        return promisify(this.rsmq.listQueues);
    };

    get changeMessageVisibility() {
        return promisify(this.rsmq.changeMessageVisibility);
    };

    get createQueue() {
        return promisify(this.rsmq.createQueue);
    };

    get setQueueAttributes() {
        return promisify(this.rsmq.setQueueAttributes);
    };

    get getQueueAttributes() {
        return promisify(this.rsmq.getQueueAttributes);
    };

    get deleteQueue() {
        return promisify(this.rsmq.deleteQueue);
    };

    get sendMessage() {
        return promisify(this.rsmq.sendMessage);
    };

    get receiveMessage() {
        return promisify(this.rsmq.receiveMessage);
    };

    get deleteMessage() {
        return promisify(this.rsmq.deleteMessage);
    };

    get popMessage() {
        return promisify(this.rsmq.popMessage);
    };

    get quit() {
        return promisify(this.rsmq.quit);
    };
}

module.exports = RedisSMQPromise;
