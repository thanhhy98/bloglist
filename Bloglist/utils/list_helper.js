const dummies = (arr) => {
    return 1;
}

const totalLike = (arr) => {
    const reducer = (sum, current) => {
        return sum += current.likes;
    }
    return arr.reduce(reducer, 0)
}

const favouriteBlog = (arr) => {
    let fav = arr.length === 0 ? 'cant decide' : arr[0];
    arr.forEach(item => {
        if(fav.likes < item.likes) {
            fav = item;
        }
    });
    return fav;
}

const mostLikes = (arr) => {
    const unique = [...new Set(arr.map(item => item.author))];
    let final = unique.map(item => {
        let sum = 0;
       newObj.forEach(vat => {
           if(item === vat.author) {
               sum += vat.likes;
           }
       })
           return {
               author: item,
               likes: sum
           }
   });
   let most = final[0]
   final.forEach(item => {
    if(most.likes < item.likes) {
        most = item;
    }
   })
   return most;
}

module.exports = {
    dummies,
    totalLike,
    favouriteBlog
}