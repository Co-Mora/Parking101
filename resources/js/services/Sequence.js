
var indexs = [];
var start = 0;
var end = 0;
const dataSequences = (source, pgNum, count) => {
    for (var i = 1; i <= count; i++) {
        if (pgNum === 1) {
            start = 1
            end = 100;
            source.forEach((el) => {
                if (start !== end + 1) {
                    el.count = start;
                    start++;
                }
            });
        } else {
          
            start = parseInt((pgNum-1) + '01');
            console.log(start);
            end = parseInt((pgNum+1) + '01');
            source.forEach((el) => {
                if (start !== end + 1) {
                    el.count = start;
                    start++;
                }
            });
        }

    }
    
}

const handleViewSquence = () => {
    return start;
};

const handleEndSquence = () => {
    return end;
};


module.exports = {
    dataSequences,
    handleViewSquence,
    handleEndSquence
}