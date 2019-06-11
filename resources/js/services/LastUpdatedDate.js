

const dataSorting = (source) => {

    source.sort(function(a, b) {
        return (new Date(b.createDate)) - (new Date(a.createDate))
    })
}


module.exports = {
    dataSorting
}